#!/usr/bin/env python3
"""Security Reminder Hook for Claude Code.

Checks for security patterns in file edits and warns about vulnerabilities.
"""

import json
import os
import sys
from datetime import datetime

SECURITY_PATTERNS = [
    {
        "ruleName": "github_actions_workflow",
        "path_check": lambda path: ".github/workflows/" in path
        and (path.endswith(".yml") or path.endswith(".yaml")),
        "reminder": (
            "You are editing a GitHub Actions workflow file. "
            "Never use untrusted input directly in run: commands. "
            "Use environment variables instead of inline expressions."
        ),
    },
    {
        "ruleName": "child_process_exec",
        "substrings": ["child_process.exec", "exec(", "execSync("],
        "reminder": (
            "Security Warning: child_process.exec() can lead to "
            "command injection. Use execFile() instead."
        ),
    },
    {
        "ruleName": "new_function_injection",
        "substrings": ["new Function"],
        "reminder": (
            "Security Warning: new Function() with dynamic strings "
            "can lead to code injection."
        ),
    },
    {
        "ruleName": "eval_injection",
        "substrings": ["eval("],
        "reminder": (
            "Security Warning: eval() executes arbitrary code. "
            "Consider JSON.parse() or alternative patterns."
        ),
    },
    {
        "ruleName": "react_dangerously_set_html",
        "substrings": ["dangerouslySetInnerHTML"],
        "reminder": (
            "Security Warning: dangerouslySetInnerHTML can lead to XSS. "
            "Ensure content is sanitized with DOMPurify."
        ),
    },
    {
        "ruleName": "innerHTML_xss",
        "substrings": [".innerHTML =", ".innerHTML="],
        "reminder": (
            "Security Warning: innerHTML with untrusted content "
            "can lead to XSS. Use textContent or sanitize."
        ),
    },
    {
        "ruleName": "pickle_deserialization",
        "substrings": ["pickle"],
        "reminder": (
            "Security Warning: pickle with untrusted content can lead "
            "to arbitrary code execution. Use JSON instead."
        ),
    },
    {
        "ruleName": "os_system_injection",
        "substrings": ["os.system", "from os import system"],
        "reminder": (
            "Security Warning: os.system should only be used with "
            "static arguments, never with user-controlled input."
        ),
    },
]


def get_state_file(session_id):
    return os.path.expanduser(
        f"~/.claude/security_warnings_state_{session_id}.json"
    )


def load_state(session_id):
    state_file = get_state_file(session_id)
    if os.path.exists(state_file):
        try:
            with open(state_file, "r") as f:
                return set(json.load(f))
        except (json.JSONDecodeError, IOError):
            return set()
    return set()


def save_state(session_id, shown_warnings):
    state_file = get_state_file(session_id)
    try:
        os.makedirs(os.path.dirname(state_file), exist_ok=True)
        with open(state_file, "w") as f:
            json.dump(list(shown_warnings), f)
    except IOError:
        pass


def check_patterns(file_path, content):
    normalized = file_path.lstrip("/")
    for pattern in SECURITY_PATTERNS:
        if "path_check" in pattern and pattern["path_check"](normalized):
            return pattern["ruleName"], pattern["reminder"]
        if "substrings" in pattern and content:
            for substring in pattern["substrings"]:
                if substring in content:
                    return pattern["ruleName"], pattern["reminder"]
    return None, None


def extract_content(tool_name, tool_input):
    if tool_name == "Write":
        return tool_input.get("content", "")
    elif tool_name == "Edit":
        return tool_input.get("new_string", "")
    elif tool_name == "MultiEdit":
        edits = tool_input.get("edits", [])
        return " ".join(e.get("new_string", "") for e in edits) if edits else ""
    return ""


def main():
    if os.environ.get("ENABLE_SECURITY_REMINDER", "1") == "0":
        sys.exit(0)

    try:
        input_data = json.loads(sys.stdin.read())
    except json.JSONDecodeError:
        sys.exit(0)

    session_id = input_data.get("session_id", "default")
    tool_name = input_data.get("tool_name", "")
    tool_input = input_data.get("tool_input", {})

    if tool_name not in ["Edit", "Write", "MultiEdit"]:
        sys.exit(0)

    file_path = tool_input.get("file_path", "")
    if not file_path:
        sys.exit(0)

    content = extract_content(tool_name, tool_input)
    rule_name, reminder = check_patterns(file_path, content)

    if rule_name and reminder:
        warning_key = f"{file_path}-{rule_name}"
        shown = load_state(session_id)

        if warning_key not in shown:
            shown.add(warning_key)
            save_state(session_id, shown)
            print(reminder, file=sys.stderr)
            sys.exit(2)

    sys.exit(0)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Rule evaluation engine for hookify plugin."""

import re
import sys
from functools import lru_cache
from typing import List, Dict, Any, Optional

from core.config_loader import Rule, Condition


@lru_cache(maxsize=128)
def compile_regex(pattern: str) -> re.Pattern:
    """Compile regex pattern with caching."""
    return re.compile(pattern, re.IGNORECASE)


class RuleEngine:
    """Evaluates rules against hook input data."""

    def evaluate_rules(self, rules: List[Rule], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Evaluate all rules and return combined results."""
        hook_event = input_data.get('hook_event_name', '')
        blocking_rules = []
        warning_rules = []

        for rule in rules:
            if self._rule_matches(rule, input_data):
                if rule.action == 'block':
                    blocking_rules.append(rule)
                else:
                    warning_rules.append(rule)

        if blocking_rules:
            messages = [f"**[{r.name}]**\n{r.message}" for r in blocking_rules]
            combined = "\n\n".join(messages)

            if hook_event == 'Stop':
                return {"decision": "block", "reason": combined, "systemMessage": combined}
            elif hook_event in ['PreToolUse', 'PostToolUse']:
                return {
                    "hookSpecificOutput": {
                        "hookEventName": hook_event,
                        "permissionDecision": "deny"
                    },
                    "systemMessage": combined
                }
            return {"systemMessage": combined}

        if warning_rules:
            messages = [f"**[{r.name}]**\n{r.message}" for r in warning_rules]
            return {"systemMessage": "\n\n".join(messages)}

        return {}

    def _rule_matches(self, rule: Rule, input_data: Dict[str, Any]) -> bool:
        tool_name = input_data.get('tool_name', '')
        tool_input = input_data.get('tool_input', {})

        if rule.tool_matcher and not self._matches_tool(rule.tool_matcher, tool_name):
            return False

        if not rule.conditions:
            return False

        return all(
            self._check_condition(c, tool_name, tool_input, input_data)
            for c in rule.conditions
        )

    def _matches_tool(self, matcher: str, tool_name: str) -> bool:
        if matcher == '*':
            return True
        return tool_name in matcher.split('|')

    def _check_condition(self, condition: Condition, tool_name: str,
                        tool_input: Dict[str, Any],
                        input_data: Dict[str, Any] = None) -> bool:
        field_value = self._extract_field(
            condition.field, tool_name, tool_input, input_data
        )
        if field_value is None:
            return False

        op = condition.operator
        pat = condition.pattern

        if op == 'regex_match':
            return self._regex_match(pat, field_value)
        elif op == 'contains':
            return pat in field_value
        elif op == 'equals':
            return pat == field_value
        elif op == 'not_contains':
            return pat not in field_value
        elif op == 'starts_with':
            return field_value.startswith(pat)
        elif op == 'ends_with':
            return field_value.endswith(pat)
        return False

    def _extract_field(self, field: str, tool_name: str,
                      tool_input: Dict[str, Any],
                      input_data: Dict[str, Any] = None) -> Optional[str]:
        if field in tool_input:
            value = tool_input[field]
            return value if isinstance(value, str) else str(value)

        if input_data:
            if field == 'reason':
                return input_data.get('reason', '')
            elif field == 'transcript':
                path = input_data.get('transcript_path')
                if path:
                    try:
                        with open(path, 'r') as f:
                            return f.read()
                    except Exception:
                        return ''
            elif field == 'user_prompt':
                return input_data.get('user_prompt', '')

        if tool_name == 'Bash' and field == 'command':
            return tool_input.get('command', '')
        elif tool_name in ['Write', 'Edit']:
            if field in ['content', 'new_text', 'new_string']:
                return tool_input.get('content') or tool_input.get('new_string', '')
            elif field in ['old_text', 'old_string']:
                return tool_input.get('old_string', '')
            elif field == 'file_path':
                return tool_input.get('file_path', '')
        elif tool_name == 'MultiEdit':
            if field == 'file_path':
                return tool_input.get('file_path', '')
            elif field in ['new_text', 'content']:
                edits = tool_input.get('edits', [])
                return ' '.join(e.get('new_string', '') for e in edits)

        return None

    def _regex_match(self, pattern: str, text: str) -> bool:
        try:
            regex = compile_regex(pattern)
            return bool(regex.search(text))
        except re.error as e:
            print(f"Invalid regex '{pattern}': {e}", file=sys.stderr)
            return False

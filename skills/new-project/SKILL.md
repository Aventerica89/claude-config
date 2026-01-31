---
name: new-project
description: Set up a new MC3 (Multi-Claude Command Center) project. Handles scaffolding, environment configuration, database setup, and deployment to xCloud/Hetzner.
---

# New MC3 Project Setup

This skill guides you through setting up a new MC3 (Multi-Claude Command Center) instance for running parallel Claude workers.

## When to Use

- Setting up MC3 on a new server
- Initializing a fresh MC3 project
- Configuring MC3 for deployment

## Setup Flow

### Step 1: Check Prerequisites

Before starting, verify these are available:
- Node.js 18+
- Docker & Docker Compose
- 1Password CLI (optional, for API key management)
- SSH access to target server (for xCloud deployment)

```bash
# Check versions
node --version
docker --version
docker-compose --version
op --version 2>/dev/null || echo "1Password CLI not installed (optional)"
```

### Step 2: Clone or Scaffold Project

**Option A: Clone existing MC3 repo**
```bash
git clone https://github.com/yourusername/claude-command.git mc3
cd mc3
```

**Option B: Use current project (if already in MC3 directory)**
```bash
# Already in project directory
pwd
```

### Step 3: Environment Configuration

**Check 1Password for existing API keys:**
```
Use list_api_keys MCP tool to check for:
- ANTHROPIC_API_KEY
- POSTGRES_PASSWORD
- Any other required keys
```

**Create .env file:**
```bash
cp .env.example .env
# Or create from scratch with required values
```

**Required environment variables:**
- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string

**For Docker deployment, also set:**
- `POSTGRES_PASSWORD` - Database password

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Database Setup

**Option A: Using Docker (recommended)**
```bash
# Start PostgreSQL and Redis
docker-compose -f docker/docker-compose.yml up -d postgres redis

# Wait for healthy status
docker-compose -f docker/docker-compose.yml ps

# Run migrations
npm run db:migrate
```

**Option B: External database**
```bash
# Set DATABASE_URL to your external PostgreSQL
# Set REDIS_URL to your external Redis
npm run db:migrate
```

### Step 6: Local Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Step 7: Production Deployment (xCloud/Hetzner)

**Server preparation:**
1. Provision Hetzner VPS (recommended: CPX31 - 4 vCPU, 8GB RAM)
2. Set up xCloud BYOS for server management
3. Install Docker on server

**Deploy with Docker Compose:**
```bash
# On the server
git clone <your-repo> mc3
cd mc3

# Configure environment
cp .env.example .env
nano .env  # Add your API keys

# Deploy
docker-compose -f docker/docker-compose.yml up -d

# Check status
docker-compose -f docker/docker-compose.yml ps
docker-compose -f docker/docker-compose.yml logs -f mc3
```

**Configure xCloud:**
- Add domain pointing to server IP
- Set up SSL via xCloud dashboard
- Configure NGINX reverse proxy for ports 3000 (MC3)

## Post-Setup Verification

1. Access dashboard at http://localhost:3000 (or your domain)
2. Create a test session to verify Claude API connectivity
3. Check PostgreSQL and Redis health via `/api/health`

## Directory Structure

After setup, your project should have:
```
mc3/
├── src/
│   ├── app/           # Next.js app
│   ├── components/    # React components
│   ├── lib/           # Core libraries
│   │   ├── claude/    # Claude manager/worker
│   │   ├── db/        # Database schema
│   │   ├── queue/     # Job queue (BullMQ)
│   │   └── trpc/      # API routes
│   └── types/         # TypeScript types
├── docker/            # Docker configuration
├── .env               # Environment variables
└── package.json
```

## Troubleshooting

**Database connection failed:**
- Check `DATABASE_URL` format
- Ensure PostgreSQL is running
- Verify network connectivity

**Claude API errors:**
- Verify `ANTHROPIC_API_KEY` is valid
- Check API rate limits

**Docker issues:**
- Run `docker-compose logs` for details
- Check container health with `docker ps`

## Integration with 1Password

If using 1Password for secret management:

1. Store API keys in 1Password vault
2. Use `op inject` for local development
3. Create `.env.local.tpl` with secret references
4. Run `npm run env:inject` to generate `.env.local`

## Cost Estimate

- Hetzner CPX31: ~$13/month
- xCloud BYOS: ~$7/month (lifetime)
- Anthropic API: Variable based on usage
- **Total infrastructure: ~$20/month**

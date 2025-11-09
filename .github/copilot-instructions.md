# AI Agent Instructions for LMS SaaS Project

## Project Architecture

This is a Learning Management System (LMS) built with microservices architecture:

- **Frontend**: React/Next.js + TypeScript in `source-code/Front-End/`
- **Backend Services** (in `source-code/Back-End/services/`):
  - `api_gateway`: Routes requests to appropriate services
  - `identity_and_access_management`: Handles auth and RBAC
  - `tenant_and_organization_management`: Manages multi-tenancy
  - `learning_and_assessment_management`: Core LMS features
  - `communication_and_notification`: Handles messaging and notifications

## Key Patterns

### Multi-tenancy
- Uses shared database with tenant IDs
- Each service handles tenant isolation
- Check `tenant_and_organization_management` service for tenant middleware patterns

### Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (RBAC)
- See `identity_and_access_management` service for auth patterns

### Database Access
- Uses Prisma ORM with PostgreSQL
- Each service has its own Prisma schema
- Follow existing migration patterns in `prisma/migrations`

## Development Workflow

1. **Setup**:
```bash
cd source-code/Back-End
npm run install:all
```

2. **Environment**:
- Copy `.env.example` to `.env` in each service directory
- Set `DATABASE_URL` for PostgreSQL connection

3. **Database**:
```bash
npm run prisma:all  # Run migrations
```

4. **Development**:
```bash
npm run start:all  # Start all services
```

## Common Operations

- **New Service**: Follow structure in existing services under `source-code/Back-End/services/`
- **Database Changes**: Use Prisma migrations in respective service
- **API Routes**: Add to respective service and update API Gateway
- **Frontend Features**: Follow patterns in `source-code/Front-End/src/components/`

## Key Files for Reference

- Service Template: `source-code/Back-End/services/api_gateway/`
- Auth Patterns: `source-code/Back-End/services/identity_and_access_management/src/`
- API Routes: Check each service's `src/routes/` directory
- Frontend Components: `source-code/Front-End/src/components/`
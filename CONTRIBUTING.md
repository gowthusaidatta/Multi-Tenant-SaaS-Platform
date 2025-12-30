# Contributing to Multi-Tenant SaaS Platform

Thank you for your interest in contributing to the Multi-Tenant SaaS Platform! We welcome contributions from the community and are grateful for your support.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, Node.js version, Docker version)
- **Error messages** or logs

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** and motivation
- **Proposed solution** or implementation approach
- **Alternative solutions** considered
- **Impact** on existing functionality

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good-first-issue` - Simple issues perfect for newcomers
- `help-wanted` - Issues where we need community help
- `bug` - Bug fixes are always welcome
- `enhancement` - Feature improvements

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- Docker & Docker Compose
- PostgreSQL 15.x (or use Docker)
- Git

### Local Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Multi-Tenant-SaaS-Platform.git
   cd Multi-Tenant-SaaS-Platform
   ```

2. **Install dependencies:**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Backend (.env)
   cp backend/.env.example backend/.env
   # Edit with your local configuration
   ```

4. **Start development environment:**
   ```bash
   # Using Docker (recommended)
   docker-compose up -d
   
   # Or manually:
   # Start PostgreSQL
   # cd backend && npm run dev
   # cd frontend && npm run dev
   ```

5. **Verify setup:**
   ```bash
   curl http://localhost:5000/api/health
   ```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Creating a Feature Branch

```bash
# Update your local repository
git checkout main
git pull origin main

# Create a new feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes in the feature branch
2. Follow the [Coding Standards](#coding-standards)
3. Write or update tests
4. Update documentation if needed
5. Test your changes thoroughly

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Integration tests
npm run test:integration
```

### Building for Production

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## Pull Request Process

### Before Submitting

- ✅ Ensure all tests pass
- ✅ Update documentation
- ✅ Follow coding standards
- ✅ Add/update tests for new features
- ✅ Verify Docker build works
- ✅ Update README.md if needed
- ✅ Rebase on latest `main` branch

### Submission Steps

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request:**
   - Use a clear, descriptive title
   - Reference related issues (e.g., "Fixes #123")
   - Describe your changes in detail
   - Include screenshots for UI changes
   - List any breaking changes

3. **PR Template:**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Unit tests added/updated
   - [ ] Integration tests pass
   - [ ] Manual testing completed
   
   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

4. **Code Review:**
   - Address reviewer feedback promptly
   - Make requested changes in new commits
   - Respond to comments professionally
   - Update PR description if scope changes

5. **Merge Requirements:**
   - At least one approving review
   - All CI checks passing
   - No merge conflicts
   - Branch up-to-date with base

## Coding Standards

### JavaScript/Node.js (Backend)

- Use **ES6+ syntax** (const, let, arrow functions)
- **Async/await** for asynchronous code
- **Error handling** - Always use try/catch blocks
- **Validation** - Validate all inputs
- **Naming conventions:**
  - camelCase for variables and functions
  - PascalCase for classes
  - UPPER_SNAKE_CASE for constants

**Example:**
```javascript
const getUserById = async (userId, tenantId) => {
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE id = $1 AND tenant_id = $2',
      [userId, tenantId]
    );
    return result.rows[0];
  } catch (error) {
    logger.error('Error fetching user:', error);
    throw error;
  }
};
```

### React/JSX (Frontend)

- Use **functional components** with hooks
- **PropTypes** for prop validation
- **Destructuring** for props
- **Meaningful component names**
- **Separate concerns** - logic vs presentation

**Example:**
```jsx
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const data = await api.getUser(userId);
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  return <div>{user?.name}</div>;
};
```

### SQL

- Use **parameterized queries** (prevent SQL injection)
- **Explicit column names** (no SELECT *)
- **Consistent indentation**
- **Comments** for complex queries

### General Principles

- **DRY** - Don't Repeat Yourself
- **KISS** - Keep It Simple, Stupid
- **SOLID** principles
- **Security first** - Never trust user input
- **Multi-tenancy** - Always filter by tenant_id

## Commit Message Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements
- `ci` - CI/CD changes

### Examples

```bash
feat(auth): add password reset functionality

Implemented password reset flow with email verification.
Users can now request password reset link via email.

Closes #45

---

fix(tasks): resolve task deletion authorization bug

Fixed issue where regular users could delete tasks
belonging to other users in the same tenant.

Fixes #123

---

docs(api): update authentication endpoint documentation

Added examples for JWT token refresh and logout endpoints.
Clarified required headers and response formats.
```

### Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to" not "moves cursor to")
- First line max 72 characters
- Reference issues and PRs when applicable
- Explain **what** and **why**, not **how**

## Testing Requirements

### Backend Tests

**Unit Tests:**
- Test individual functions and methods
- Mock external dependencies
- Cover edge cases and error scenarios

**Integration Tests:**
- Test API endpoints end-to-end
- Use test database
- Verify authentication and authorization
- Check data isolation between tenants

**Test Coverage:**
- Minimum 70% coverage required
- Critical paths must have 90%+ coverage
- All API endpoints must have tests

### Frontend Tests

**Component Tests:**
- Test component rendering
- Test user interactions
- Test prop handling
- Mock API calls

**Integration Tests:**
- Test page navigation
- Test form submissions
- Test authentication flows

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.js

# Run in watch mode
npm test -- --watch
```

## Documentation

### Code Documentation

- **JSDoc comments** for functions and classes
- **Inline comments** for complex logic
- **README files** in major directories
- **API documentation** for all endpoints

### Documentation Updates

When adding features, update:
- README.md
- API.md
- architecture.md (if architecture changes)
- technical-spec.md (if tech stack changes)
- Code comments

### Example JSDoc

```javascript
/**
 * Creates a new task for a project
 * @param {number} projectId - The ID of the project
 * @param {Object} taskData - The task data
 * @param {string} taskData.title - Task title
 * @param {string} taskData.description - Task description
 * @param {number} taskData.assigned_to - User ID to assign task to
 * @param {number} tenantId - The tenant ID for isolation
 * @returns {Promise<Object>} The created task
 * @throws {Error} If project not found or user limit exceeded
 */
async function createTask(projectId, taskData, tenantId) {
  // Implementation
}
```

## Community

### Getting Help

- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and general discussion
- **Documentation** - Check docs/ folder first

### Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for major contributions
- Special mention for first-time contributors

### License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Thank You! 🙏

Your contributions make this project better for everyone. We appreciate your time and effort!

**Happy Coding!** 🚀

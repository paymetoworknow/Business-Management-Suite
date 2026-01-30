# Business Management Suite - Copilot Instructions

## Project Overview

This is an all-in-one business management suite that provides:
- **CRM** (Customer Relationship Management)
- **Contract Generation** - Automated contract creation and management
- **Bookkeeping** - Financial tracking and accounting features
- **Analytics** - Business intelligence and reporting capabilities

The project aims to provide small to medium businesses with a comprehensive platform to manage their operations efficiently.

## Tech Stack & Conventions

- **Runtime**: Node.js
- **Primary Language**: JavaScript (TypeScript may be used for type safety)
- **Package Manager**: npm or yarn
- **Build Tools**: Standard Node.js ecosystem tools (Webpack, Vite, or similar)
- **Testing**: Jest or similar testing frameworks
- **Linting**: ESLint for code quality

### Directory Structure

**Note**: The following represents the intended directory structure as the project develops.

```
/
├── .github/          # GitHub specific files and workflows
├── src/              # Source code
├── tests/            # Test files
├── docs/             # Documentation
└── package.json      # Project dependencies and scripts
```

## Coding Guidelines

1. **Code Quality**
   - Write clean, readable, and maintainable code
   - Follow ES6+ JavaScript standards
   - Use meaningful variable and function names
   - Keep functions small and focused on a single responsibility

2. **TypeScript Usage** (if applicable)
   - Avoid using `any` type; prefer explicit typing
   - Use interfaces for object shapes
   - Enable strict mode in tsconfig.json

3. **Error Handling**
   - Always handle errors gracefully
   - Use try-catch blocks for async operations
   - Provide meaningful error messages

4. **Documentation**
   - Add JSDoc comments for public APIs and complex functions
   - Keep README.md up to date
   - Document any non-obvious business logic

5. **Security**
   - Never commit sensitive data (API keys, passwords, etc.)
   - Use environment variables for configuration
   - Validate and sanitize all user inputs
   - Follow OWASP security best practices

## Build, Test, and Deployment

**Note**: The following commands represent the intended build and test setup. Implement these scripts in package.json as the project develops.

### Building the Project
```bash
npm install          # Install dependencies
npm run build        # Build the project
```

### Running Tests
```bash
npm test             # Run all tests
npm run test:unit    # Run unit tests
npm run test:e2e     # Run end-to-end tests (if available)
```

### Linting
```bash
npm run lint         # Check code style
npm run lint:fix     # Auto-fix linting issues
```

### Running the Application
```bash
npm start            # Start the application
npm run dev          # Start in development mode
```

## Architecture and Design Patterns

1. **Modularity**
   - Keep components/modules loosely coupled
   - Follow separation of concerns
   - Use dependency injection where appropriate

2. **Business Logic**
   - Separate business logic from presentation layer
   - Use service layer for business operations
   - Keep controllers thin

3. **Database**
   - Use migrations for schema changes
   - Write efficient queries
   - Implement proper indexing

4. **API Design**
   - Follow RESTful conventions for APIs
   - Use proper HTTP methods (GET, POST, PUT, DELETE)
   - Return appropriate status codes
   - Version APIs when breaking changes are necessary

## Validation and Review Guidelines

Before submitting a PR:

1. **Code Review Checklist**
   - [ ] Code follows the style guidelines
   - [ ] All tests pass
   - [ ] No linting errors
   - [ ] Code is properly documented
   - [ ] No sensitive data in commits
   - [ ] Changes are minimal and focused

2. **Testing Requirements**
   - Write tests for new features
   - Maintain or improve code coverage
   - Test edge cases and error scenarios
   - Ensure tests are deterministic

3. **Documentation**
   - Update README if needed
   - Add/update API documentation
   - Update changelog if applicable

## Domain-Specific Considerations

### CRM Module
- Ensure customer data privacy and GDPR compliance
- Implement proper access controls
- Log all customer interactions

### Contract Generation
- Validate all contract templates
- Ensure legal compliance
- Implement audit trails for contract changes

### Bookkeeping
- Follow accounting standards
- Ensure data accuracy and integrity
- Implement proper reconciliation mechanisms

### Analytics
- Optimize queries for performance
- Implement proper data aggregation
- Ensure reports are accurate and timely

## Resources

- [Project README](../README.md)
- [License](../LICENSE)

---

**Note**: These instructions are meant to guide GitHub Copilot in generating better, more context-aware code suggestions. Always review and validate generated code before committing.

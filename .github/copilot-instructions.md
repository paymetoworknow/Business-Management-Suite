# Business Management Suite - Copilot Instructions

## Project Overview

This is an all-in-one business management suite that provides:
- **CRM** (Customer Relationship Management)
- **Contract Generation** - Automated contract creation and management
- **Bookkeeping** - Financial tracking and accounting features
- **Analytics** - Business intelligence and reporting capabilities

The project aims to provide small to medium businesses with a comprehensive platform to manage their operations efficiently.

## Tech Stack & Conventions

- **Runtime**: Python 3.x
- **Primary Language**: Python
- **Package Manager**: pip (or poetry for advanced dependency management)
- **Build Tools**: Standard Python ecosystem tools
- **Testing**: pytest or unittest
- **Linting**: pylint, flake8, or black for code formatting

### Directory Structure

**Note**: The following represents the intended directory structure as the project develops.

```
/
├── .github/          # GitHub specific files and workflows
├── src/              # Source code
├── tests/            # Test files
├── docs/             # Documentation
├── requirements.txt  # Project dependencies
└── app.py            # Main application entry point
```

## Coding Guidelines

1. **Code Quality**
   - Write clean, readable, and maintainable code
   - Follow PEP 8 Python style guidelines
   - Use meaningful variable and function names
   - Keep functions small and focused on a single responsibility

2. **Type Hints** (recommended)
   - Use Python type hints for better code clarity
   - Use typing module for complex types
   - Consider using mypy for static type checking

3. **Error Handling**
   - Always handle errors gracefully
   - Use try-catch blocks for async operations
   - Provide meaningful error messages

4. **Documentation**
   - Use docstrings for modules, classes, and functions (Google or NumPy style)
   - Keep README.md up to date
   - Document any non-obvious business logic

5. **Security**
   - Never commit sensitive data (API keys, passwords, etc.)
   - Use environment variables for configuration
   - Validate and sanitize all user inputs
   - Follow OWASP security best practices

## Build, Test, and Deployment

**Note**: The following commands represent the intended build and test setup. Implement these as the project develops.

### Setting Up the Environment
```bash
python -m venv venv           # Create virtual environment
source venv/bin/activate      # Activate on Linux/Mac
# or
venv\Scripts\activate         # Activate on Windows
pip install -r requirements.txt  # Install dependencies
```

### Running Tests
```bash
pytest                        # Run all tests
pytest tests/unit/            # Run unit tests
pytest tests/integration/     # Run integration tests (if available)
```

### Linting and Formatting
```bash
pylint src/                   # Check code style
flake8 src/                   # Additional linting
black src/                    # Auto-format code
```

### Running the Application
```bash
python app.py                 # Start the application
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

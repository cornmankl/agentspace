# Contributing to AGENTSPACE

Thank you for your interest in contributing to AGENTSPACE! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agentspace.git
   cd agentspace
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build packages:
   ```bash
   npm run build
   ```
5. Start development:
   ```bash
   npm run dev
   ```

## Project Structure

- `packages/types`: Shared TypeScript types and interfaces
- `packages/core`: Core agent management logic
- `apps/server`: Express API server
- `apps/dashboard`: React frontend
- `examples/`: Example scripts and demos

## Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the coding standards:
   - Use TypeScript strict mode
   - Follow existing code style
   - Add types for all functions and variables
   - Write clear, descriptive commit messages

3. Test your changes:
   ```bash
   npm run build
   npm run lint
   npm test
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

## Commit Message Format

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update CHANGELOG.md with your changes
4. Submit a pull request with a clear description

## Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Use meaningful variable names
- Document complex logic with comments

## Adding New Features

When adding new features:
1. Discuss in an issue first
2. Update relevant documentation
3. Add tests if applicable
4. Update examples if needed

## Reporting Bugs

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Error messages or logs

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for contributing to AGENTSPACE! 🚀

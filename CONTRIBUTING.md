# Contributing to Physics Book

Thank you for your interest in contributing to Physics Book! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

### Suggesting Features

Feature suggestions are welcome! Please:
- Check if the feature already exists
- Provide detailed use cases
- Explain why it would benefit users
- Include mockups or examples if possible

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/AzuraDev202/Physic_Book_Ver1.0.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write clear commit messages
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots for UI changes

## 📝 Code Style Guidelines

### TypeScript/JavaScript
- Use TypeScript for type safety
- Follow ESLint rules
- Use meaningful variable names
- Add JSDoc comments for functions
- Prefer functional components with hooks

### React Components
```typescript
// Good
interface Props {
  title: string
  onClick: () => void
}

export default function MyComponent({ title, onClick }: Props) {
  return (
    <button onClick={onClick}>
      {title}
    </button>
  )
}
```

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first approach
- Use consistent spacing
- Support dark mode

### File Naming
- Components: PascalCase (e.g., `UserMenu.tsx`)
- Utilities: camelCase (e.g., `useProgress.ts`)
- API routes: lowercase (e.g., `route.ts`)

## 🗂️ Project Structure

```
app/          - Next.js App Router pages and API routes
components/   - Reusable React components
contexts/     - React Context providers
hooks/        - Custom React hooks
lib/          - Utility functions and configurations
models/       - Database models (Mongoose schemas)
public/       - Static assets
scripts/      - Utility scripts
types/        - TypeScript type definitions
```

## 🧪 Testing

Before submitting a PR:
- Test all affected features manually
- Check responsive design on different screen sizes
- Test dark mode if UI changes were made
- Verify no console errors or warnings

## 📚 Documentation

When adding features:
- Update README.md if needed
- Add JSDoc comments to new functions
- Update CHANGELOG.md
- Document API endpoints
- Add usage examples

## 🔒 Security

- Never commit sensitive data (.env files, API keys)
- Use environment variables for secrets
- Follow OWASP security practices
- Report security vulnerabilities privately

## ✅ Commit Message Format

Use conventional commits:
```
type(scope): subject

body (optional)
footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(exercises): add filter by difficulty level
fix(auth): resolve token expiration issue
docs(readme): update installation instructions
```

## 🎯 Priority Areas

We especially welcome contributions in:
- Additional exercises and questions
- New interactive simulations
- UI/UX improvements
- Performance optimizations
- Documentation improvements
- Accessibility enhancements
- Internationalization (i18n)

## 💬 Community

- Be respectful and constructive
- Help others in issues and discussions
- Share your use cases and feedback
- Star the repo if you find it useful!

## 📧 Contact

For questions or discussions:
- Create an issue on GitHub
- Tag maintainers in your PR
- Check existing issues first

Thank you for contributing to Physics Book! 🚀

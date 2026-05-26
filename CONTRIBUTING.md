# Contributing to QIE Lens

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/ulsreall/qie-lens.git
cd qie-lens
npm install
npm run dev
```

## Branch Strategy

- `main` — production-ready code
- `dev` — active development
- Feature branches: `feat/your-feature`
- Bug fixes: `fix/your-fix`

## Commit Convention

```
type: description

feat: add new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructuring
test: adding tests
chore: maintenance
```

## Pull Requests

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## Code Style

- TypeScript strict mode
- Tailwind CSS for styling
- Components in `src/components/`
- API functions in `src/lib/`

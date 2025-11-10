---
name: Release planning
about: Track work required to publish a Primer release
labels: release
assignees:
---

## Release version

- Target tag: `vX.Y.Z`
- Target date:

## Scope & goals

- Summary:
- Key highlights to ship:

## Owners

- Release captain:
- QA reviewer:
- Documentation owner:

## Dependencies & blockers

- [ ] Frontend dependencies resolved
- [ ] Backend dependencies resolved
- [ ] External services/credentials confirmed

## Tasks

- [ ] Cut `release/vX.Y.Z` branch from `main`
- [ ] Update documentation (audience guides, release notes, README links)
- [ ] Update version metadata and changelog references
- [ ] Run tests (`npm run test`) and lint (`npm run lint`)
- [ ] Generate build artifacts (frontend export, backend build)
- [ ] Prepare sanitized data for GitHub Pages demo
- [ ] Draft release notes using `.github/release-template.md`
- [ ] Verify GitHub Pages preview
- [ ] Schedule release publication

## Notes / follow ups

-

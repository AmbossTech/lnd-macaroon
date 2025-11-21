# LND Macaroon Decoder

A helper NPM package which decodes [LND](https://github.com/lightningnetwork/lnd) macaroons.

Built with the help of [guggero/cryptography-toolkit](https://github.com/guggero/cryptography-toolkit)

## Programmatic usage

`getMacaroonOperations` takes in an LND macaroon in hex format and returns an array of entities and actions.

```typescript
const permissions = getMacaroonOperations(macaroonHex);

for (const { entity, actions } of permissions) {
  console.log({ entity, actions });
}

// { entity: 'address', actions: [ 'read' ] }
// { entity: 'info', actions: [ 'read' ] }
// { entity: 'macaroon', actions: [ 'write' ] }
// {
//   entity: 'uri',
//   actions: [
//     '/lnrpc.Lightning/AddInvoice',
//     '/peersrpc.Peers/UpdateNodeAnnouncement'
//   ]
// }
```

`getMacaroonInfo` includes the macaroon's `location` value, which lets you
distinguish between macaroons from `lnd`, `tapd` and `litd`.

```typescript
const info = getMacaroonInfo(macaroonHex);
console.log(info);

// {
//   location: "lnd",
//   permissions: [
//     { entity: 'address', actions: [ 'read' ] },
//     { entity: 'info', actions: [ 'read' ] },
//     // ...
//   ]
// }
```

`getFlatPermissionList` and `verifyMacaroonPermissions` are helper functions to check the macaroon permissions.

## Running the CLI command

Use the NPM script to decode a macaroon:

```bash
npm run decode <your-macaroon-hex>
```

Replace `<your-macaroon-hex>` with an actual LND macaroon in hex format.

## Automated releases

This repository uses [semantic-release](https://github.com/semantic-release/semantic-release) and a GitHub action [workflow](./.github/workflows/release.yml) to automate versioning, changelog generation, GitHub releases, and publishing to [npm](https://www.npmjs.com/) whenever a change is merged into `main`.

### Commit message rules
- [semantic-release](https://github.com/semantic-release/semantic-release) infers the next version from commit messages using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Examples:

  - Patch release: `fix: correct typo`
  - Minor release: `feat: add decode option`
  - Major release: `feat!: breaking change description` or include `BREAKING CHANGE:` in the commit body

### How releases are triggered
- Merge a PR into `main` with Conventional Commit messages and the Action will run. If commits indicate a release, the workflow will build, create a new version, update `CHANGELOG.md`, push a commit with the updated files, create a Git tag and GitHub release, and publish to npm.

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

## Publishing Method

When you update the package version and that change is merged in the `main` branch, the publication happens automatically. You can either manually update the `version` inside `package.json` or use one of these NPM commands for [semantic versioning](https://semver.org/).

```bash
npm version minor

npm version patch

npm version major
```

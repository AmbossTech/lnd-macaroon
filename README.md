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

`getFlatPermissionList` and `verifyMacaroonPermissions` are helper functions to check the macaroon permissions.

## Running the CLI command

Use the NPM script to decode a macaroon:

```bash
npm run decode <your-macaroon-hex>
```

Replace `<your-macaroon-hex>` with an actual LND macaroon in hex format.

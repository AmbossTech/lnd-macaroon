# LND Macaroon Decoder

#### This NPM package helps decoding macaroons for [LND](https://github.com/lightningnetwork/lnd).

##### Built with help of [guggero/cryptography-toolkit](https://github.com/guggero/cryptography-toolkit)

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

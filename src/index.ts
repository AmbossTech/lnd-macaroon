const { base64ToBytes, importMacaroon } = require('macaroon');
import { difference, isEqual } from 'lodash';
// @ts-expect-error lib does not support TS
import { MacaroonId } from './proto/id_pb';

type MacaroonPermission = { entity: string; actions: string[] };
type FlatMacaroonPermission = `${string}:${string}`;

export function getMacaroonOperations (
  macaroonHex: string,
): MacaroonPermission[] {
  const base64 = Buffer.from(macaroonHex, 'hex');
  const mac = importMacaroon(base64);

  const macJson = mac.exportJSON();
  const identBytes = Buffer.from(base64ToBytes(macJson.i64));

  if (identBytes[0] !== 0x03) {
    throw new Error(`Invalid start byte`);
  }

  const id = MacaroonId.deserializeBinary(identBytes.subarray(1));
  return id.getOpsList().map((op: any) => ({
    entity: op.getEntity(),
    actions: op.getActionsList(),
  }));
};


/**
 * @returns `(entity:action)[]`
 */
export const getFlatPermissionList = (
  macaroonPermissions: MacaroonPermission[],
): FlatMacaroonPermission[] => {
  return macaroonPermissions.reduce((list, p) => {
    for (const action of p.actions) {
      list.push(`${p.entity}:${action}`);
    }

    return list;
  }, [] as FlatMacaroonPermission[]);
};

/**
 * @param givenPermissions Expects format `(entity:action)[]`
 * @param wantedPermissions Expects format `(entity:action)[]`
 * @returns permissions of the macaroon
 */
export const verifyMacaroonPermissions = (
  givenPermissions: FlatMacaroonPermission[],
  wantedPermissions: FlatMacaroonPermission[],
): string[] => {
  const matches = isEqual(givenPermissions, wantedPermissions);
  if (matches) return givenPermissions;

  // Check which permissions are missing
  const missingPermissions = difference(wantedPermissions, givenPermissions);
  if (missingPermissions.length) {
    throw new Error(
      `Macaroon is missing permissions: ${missingPermissions.join(', ')}`,
    );
  }

  // Check which permissions are not wanted
  for (const permission of givenPermissions) {
    const need = wantedPermissions.includes(permission);
    if (!need) throw new Error(`Unwanted permission: ${permission}`);
  }

  console.error(`Unexpected issue during macaroon permissions check`, {
    givenPermissions,
    wantedPermissions,
  });
  throw new Error(`Unable to verify macaroon`);
};

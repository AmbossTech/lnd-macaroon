const { base64ToBytes, importMacaroon } = require('macaroon');
// @ts-expect-error lib does not support TS
import { MacaroonId } from './proto/id_pb';

type MacaroonPermission = { entity: string; actions: string[] };

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

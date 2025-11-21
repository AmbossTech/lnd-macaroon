import { getMacaroonInfo, getFlatPermissionList, MacaroonInfo } from "./index";

function prettyPrint({ location, permissions }: MacaroonInfo) {
  console.log(`---`);
  console.log(`Location: ${location}`);
  console.log("\nMacaroon Permissions:");
  permissions.forEach(({ entity, actions }) => {
    console.log(`  ${entity}: ${actions.join(", ")}`);
  });
  console.log("\nFlat format:");
  getFlatPermissionList(permissions).forEach((perm) => {
    console.log(`  ${perm}`);
  });
}

const args = process.argv.slice(2);
const macaroonHex = args[0];

if (!macaroonHex) {
  console.error("Usage: npm run decode <macaroon-hex>");
  process.exit(1);
}

try {
  prettyPrint(getMacaroonInfo(macaroonHex));
} catch (error) {
  console.error("Error:", (error as Error).message);
  process.exit(1);
}

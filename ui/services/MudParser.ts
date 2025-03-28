"use client";

import { MudFile, DefaultMudInfo } from "@/types/Mud";
import AclParser from "./AclParser";

class MudParser {
  private extractDevicePolicyNames(obj: any, key: string): string[] {
    let keys = Object.keys(obj);
    if (keys.indexOf(key) == -1) throw new Error("Policy list does not exist");

    // Find the accessList of names by looking in the first sub object
    // and from there looking at the access-list key
    let acls = obj[key];
    let acls_keys = Object.keys(acls);
    let accessList: Array<{ name: string }> = acls[acls_keys[0]]["access-list"];

    return accessList.map((a) => {
      return a.name;
    });
  }

  private extractMudInfo(obj: any): MudFile {
    let info: MudFile = { ...DefaultMudInfo };

    let keys = Object.keys(obj);
    keys.forEach((k) => {
      let val = obj[k];
      switch (k) {
        case "mud-version":
          info.mudVersion = val;
          break;
        case "mud-url":
          info.mudUrl = val;
          break;
        case "last-update":
          info.lastUpdate = val;
          break;
        case "is-supported":
          info.isSupported = val;
          break;
        case "mud-signature":
          info.mudSignature = val;
          break;
        case "cache-validity":
          info.cacheValidity = val;
          break;
        case "systeminfo":
          info.systemInfo = val;
          break;
        case "mfg-name":
          info.mfgName = val;
          break;
        case "firmware-rev":
          info.firmwareRev = val;
          break;
        case "software-rev":
          info.softwareRev = val;
          break;
        case "documentation":
          info.documentation = val;
          break;
        case "extensions":
          info.extensions = val;
          break;
        default:
          break;
      }
    });

    try {
      info.fromDevicePolicy = this.extractDevicePolicyNames(
        obj,
        "from-device-policy"
      );
      info.toDevicePolicy = this.extractDevicePolicyNames(
        obj,
        "to-device-policy"
      );
    } catch (err: unknown) {
      console.error("Error fetching policy names", err);
    }

    return info;
  }

  aclsKeys = [
    "ietf-access-control-list:acls",
    "ietf-access-control-list:access-lists",
  ];

  parse(mud: any): MudFile {
    const mudKeys = Object.keys(mud);
    const mudInfo = this.extractMudInfo(mud["ietf-mud:mud"]);

    mudKeys.forEach((k) => {
      if (this.aclsKeys.indexOf(k) == -1) return;
      mudInfo.acls = AclParser.parseAll(mud[k]);
    });

    if (typeof window != "undefined") {
      console.log("mud info\n", mudInfo);
    }
    return mudInfo;
  }

  removePolicies(mud: any, policies: string[]): any {
    const mudKeys = Object.keys(mud);
    mudKeys.forEach((k) => {
      if (this.aclsKeys.indexOf(k) == -1) return;
      mud[k]["acl"].forEach((acl: any) => {
        acl["aces"]["ace"] = acl["aces"]["ace"].filter(
          (ace: any) => !policies.includes(ace["name"])
        );
      });
    });

    return mud;
  }
}

export default new MudParser();

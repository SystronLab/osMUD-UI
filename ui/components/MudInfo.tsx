"use client";
import MudHelp from "@/json/mud-help.json";
import { MudContext } from "@/contexts/MudContext";
import KvItem from "./KvItem";
import React from "react";
import classNames from "classnames";
import LoadFile from "../components/Navbar/LoadFile";
import SaveMud from "../components/Navbar/SaveMud";

export default function MudInfo() {
  var { mud } = React.useContext(MudContext);

  return (
    <>
    <LoadFile/>
    <SaveMud/>
    <div className="flex flex-col gap-y-1">
      <KvItem
        title="System Info"
        value={mud.systemInfo}
        help={MudHelp.systeminfo}
      />
      <KvItem
        title="Last Updated"
        value={mud.lastUpdate}
        help={MudHelp.lastUpdate}
      />
      <KvItem
        title="Cache Validity"
        suffix="hours"
        value={mud.cacheValidity}
        help={MudHelp.cacheValidity}
      />
      <KvItem title="URL" value={mud.mudUrl} help={MudHelp.mudUrl} url />
      <KvItem
        title="Signature"
        value={mud.mudSignature}
        help={MudHelp.mudSignature}
        url
      />
      <KvItem
        title="Manufacturer Name"
        value={mud.mfgName}
        help={MudHelp.mfgName}
      />
      <KvItem
        title="Firmware Rev"
        value={mud.firmwareRev}
        help={MudHelp.firmwareRev}
      />
      <KvItem
        title="Software Rev"
        value={mud.softwareRev}
        help={MudHelp.softwareRev}
      />
      <KvItem title="Documentation" value={mud.documentation} url />
      <p
        className={classNames(
          "font-semibold",
          mud.isSupported ? "text-success" : "text-error"
        )}
      >
        {mud.isSupported ? "Supported" : "Not Supported"}
      </p>
    </div>
    </>
  );
}

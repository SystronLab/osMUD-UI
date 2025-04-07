"use client";
import MudHelp from "@/json/mud-help.json";
import { MudContext } from "@/contexts/MudContext";
import KvItem from "./KvItem";
import React from "react";
import classNames from "classnames";
import LoadFile from "../components/Navbar/LoadFile";

export default function MudInfo() {
  const { mud } = React.useContext(MudContext);

  return (
    <div className="w-full mt-8 mx-auto bg-base-100 shadow-md rounded-xl px-6 py-8">
      <h2 className="text-2xl font-bold text-base-content">Device Details</h2>
      <hr className="mb-6"></hr>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Device Info */}
        <div className="flex-1 flex flex-col gap-3">
          <KvItem title="Manufacturer Name" value={mud.mfgName} help={MudHelp.mfgName} />
          <KvItem title="System Info" value={mud.systemInfo} help={MudHelp.systeminfo} />
          <KvItem title="Last Updated" value={mud.lastUpdate} help={MudHelp.lastUpdate} />
          <KvItem title="Cache Validity" suffix="hours" value={mud.cacheValidity} help={MudHelp.cacheValidity} />
          <KvItem title="URL" value={mud.mudUrl} help={MudHelp.mudUrl} url />
          <KvItem title="Signature" value={mud.mudSignature} help={MudHelp.mudSignature} url />
          <KvItem title="Firmware Rev" value={mud.firmwareRev} help={MudHelp.firmwareRev} />
          <KvItem title="Software Rev" value={mud.softwareRev} help={MudHelp.softwareRev} />
          <KvItem title="Documentation" value={mud.documentation} url />

          <div>
            <span className="font-normal">Status:</span>{" "}
            <p
              className={classNames(
                "inline-block px-3 py-1 text-sm font-medium rounded-full",
                mud.isSupported ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}
            >
              {mud.isSupported ? "Supported" : "Not Supported"}
            </p>
          </div>
        </div>
        <div className="w-full h-full md:w-1/3 flex items-start justify-center md:justify-end">
          <LoadFile />
        </div>
      </div>
    </div>
  );
}

import { MudContext } from "@/contexts/MudContext";
import MudParser from "@/services/MudParser";
import MudStore from "@/services/MudStore";
import ManagerService from "@/services/api/ManagerService";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import { flushSync } from "react-dom";

interface SaveMudProps {
  buttonClassName?: string;
}

export default function SaveMud(props: SaveMudProps) {
  const { blockedPolicies } = React.useContext(MudContext);
  const searchParams = useSearchParams();
  const mudCtx = useContext(MudContext);

  function save() {
    const newMud = MudParser.removePolicies(
      JSON.parse(JSON.stringify(mudCtx.rawMud)),
      blockedPolicies
    );
    const macAddress = searchParams.get("mac");
    if (macAddress != null) {
      ManagerService.SetMud(macAddress, newMud);
      mudCtx.refresh();
    }
  }

  return (
    <>
      <button
        onClick={save}
        className={classNames("btn", props.buttonClassName, {
          "btn-disabled": mudCtx.refreshing,
        })}
      >
        Apply MUD File
      </button>
    </>
  );
}
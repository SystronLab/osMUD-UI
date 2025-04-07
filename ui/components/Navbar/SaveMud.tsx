import { MudContext } from "@/contexts/MudContext";
import MudParser from "@/services/MudParser";
import MudStore from "@/services/MudStore";
import ManagerService from "@/services/api/ManagerService";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

interface SaveMudProps {
  buttonClassName?: string;
}

export default function SaveMud(props: SaveMudProps) {
  const { blockedPolicies } = useContext(MudContext);
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
    <button
      onClick={save}
      className={classNames(
        "btn text-white bg-teal-600 hover:bg-teal-700 transition-colors rounded-md flex items-center gap-2 px-4 py-2",
        props.buttonClassName,
        {
          "btn-disabled": mudCtx.refreshing,
        }
      )}
    >
      <FontAwesomeIcon icon={faFloppyDisk} className="text-white text-lg" />
      Apply MUD Policy
    </button>
  );
}

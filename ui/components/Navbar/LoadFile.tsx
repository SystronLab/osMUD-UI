"use client";

import React from "react";
import Modal from "../Modal";
import { MudContext } from "@/contexts/MudContext";
import MudStore from "@/services/MudStore";
import ModalService from "@/services/ModalService";
import classNames from "classnames";

interface LoadFileProps {
  buttonClassName?: string;
}

export default function LoadFile(props: LoadFileProps) {
  var MudCtx = React.useContext(MudContext);
  const [files, setFiles] = React.useState("");
  const [error, setError] = React.useState(false);
  const modalId = "navbar-load-file";

  function onLoadFile(e: React.MouseEvent) {
    e.preventDefault();
    setError(false);
    if (files == "") {
      setError(true);
      return;
    }

    MudStore.StoreJson(files);
    MudCtx.load();

    ModalService.closeWithId(modalId);
  }
  console.log("Load: ", Date.now())
  return (
    <>
      <Modal
        id={modalId}
        title="Load MUD File"
        className={classNames(props.buttonClassName, {
          "btn-disabled": MudCtx.refreshing,
        })}
      >
        <div className="flex flex-col">
          <h2 className="font-semibold text-2xl mb-2">Load MUD File</h2>
          <p className="mb-4">Upload a valid mud file below:</p>
          <input
            type="file"
            className="mb-4 file-input file-input-bordered"
            onChange={(e) => {
              if (e?.target?.files == null) return;
              setError(false);
              try {
                const fileReader = new FileReader();
                fileReader.readAsText(e?.target?.files[0], "UTF-8");
                fileReader.onload = (e) => {
                  console.log("e.target.result", e.target?.result);
                  setFiles((e.target?.result as string) ?? "");
                };
              } catch {
                setError(true);
              }
            }}
          />
          <div className="">
            {error && (
              <p className="text-error mb-2">
                An error ocurred loading the MUD file, please try again
              </p>
            )}
            <button className="btn btn-accent mt-2" onClick={onLoadFile}>
              Load
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

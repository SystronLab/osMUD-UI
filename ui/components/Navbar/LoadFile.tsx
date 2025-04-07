"use client";

import React from "react";
import { MudContext } from "@/contexts/MudContext";
import MudStore from "@/services/MudStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

export default function LoadFile() {
  const MudCtx = React.useContext(MudContext);
  const [files, setFiles] = React.useState("");
  const [error, setError] = React.useState(false);

  function onLoadFile(e: React.MouseEvent) {
    e.preventDefault();
    setError(false);
    if (files === "") {
      setError(true);
      return;
    }

    MudStore.StoreJson(files);
    MudCtx.load();
  }

  return (
    <div className="w-full max-w-full border border-base-300 rounded-lg pl-6 pr-6 pt-4 pb-4 bg-base-100 shadow-sm">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-1">
        <FontAwesomeIcon icon={faUpload} className="text-teal-600 text-xl" />
        <h3 className="text-lg font-semibold text-base-content">
          Upload a MUD File
        </h3>
      </div>

      {/* Description for layman users */}
      <p className="text-sm text-base-content mb-2 leading-relaxed">
        Upload your MUD file to view and edit its network configuration.
      </p>

      {/* File input */}
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-md mb-1 rounded-md"
        onChange={(e) => {
          if (!e?.target?.files) return;
          setError(false);
          try {
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = (e) => {
              setFiles((e.target?.result as string) ?? "");
            };
          } catch {
            setError(true);
          }
        }}
      />

      {/* Error message */}
      {error && (
        <p className="text-error text-sm mt-1">
          Please upload a valid MUD file.
        </p>
      )}

      {/* Submit button */}
      <button
        className={classNames(
          "btn mt-4 text-white bg-teal-600 hover:bg-teal-700 rounded-md",
          {
            "btn-disabled": MudCtx.refreshing,
          }
        )}
        onClick={onLoadFile}
      >
        <FontAwesomeIcon icon={faUpload} className="mr-2" />
        Load MUD File
      </button>
    </div>
  );
}

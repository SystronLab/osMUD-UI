import classNames from "classnames";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

interface ModalProps extends React.PropsWithChildren {
  id: string;
  title?: string;
  className?: string;
}

export default function Modal(props: ModalProps) {
  return (
    <>
      <button
        className={classNames("btn rounded-md flex items-center gap-1 px-2 py-1", props?.className)}
        onClick={() =>
          (document.getElementById(props.id) as HTMLDialogElement)?.showModal()
        }
      >
        {/* Show icon only for view-like titles (you can customize this check) */}
        {props?.title?.toLowerCase() === "view" && (
          <FontAwesomeIcon icon={faEye} className="text-base" />
        )}
        {props?.title ?? "Open Modal"}
      </button>

      <dialog id={props.id} className="modal rounded-md">
        <div className="modal-box">{props.children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

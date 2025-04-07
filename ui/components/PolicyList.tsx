import { MudContext } from "@/contexts/MudContext";
import classNames from "classnames";
import React, { ReactElement } from "react";
import Policy from "./ViewPolicy/Policy";
import { ACE_DIRECTION } from "@/types/Acl";

interface PolicyListNavigationProps {
  title: string;
  items: string[];
  active: string;
  svg: ReactElement;
  onClick?(name: string): void;
}

function PolicyListNavigation(props: PolicyListNavigationProps) {
  console.log("Loaded: ", Date.now())
  return (
    <ul className="menu w-full rounded-box">
      <li>
        <h2 className="menu-title flex items-center gap-4 px-1.5 text-base-content  font-semibold">
          <span className="text-base-300">{props.svg}</span>
          {props.title}
        </h2>
        <ul>
          {props.items.map((p) => {
            return (
              <li className="w-fit" key={p}>
                <button
                  className={classNames(props.active == p && "active")}
                  onClick={() => {
                    if (props.onClick) props.onClick(p);
                  }}
                >
                  {p}
                </button>
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}

export default function PolicyList() {
  var MudCtx = React.useContext(MudContext);
  const [activePolicy, setActivePolicy] = React.useState<string>("");
  const [activePolicyDirection, setACtivePolicyDirection] =
    React.useState<ACE_DIRECTION>("from-device");

  React.useEffect(
    function setDefaultSelectedPolicy() {
      setActivePolicy(MudCtx.mud.fromDevicePolicy[0]);
      setACtivePolicyDirection("from-device");
    },
    [MudCtx.mud]
  );

  return (
    <>
      <hr></hr>
      <div className="grid lg:grid-cols-8">
        <div className="flex flex-col gap-y-0 col-span-2 border-r border-r-base-200">
          <PolicyListNavigation
            title="From Device Policies"
            items={MudCtx.mud.fromDevicePolicy}
            active={activePolicy}
            onClick={(p) => {
              setACtivePolicyDirection("from-device");
              setActivePolicy(p);
            }}
            svg={
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                className="fill-current"
              >
                <path d="M13 9h2v-7c0-1.104-.896-2-2-2h-10c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-7h-2v4h-10v-14.024h10v4.024zm-5 13c.553 0 1-.448 1-1s-.447-1-1-1c-.552 0-.999.448-.999 1s.447 1 .999 1zm10-11v-3l5 4-5 4v-3h-9v-2h9zm-11.5-9h3c.276 0 .5.224.5.5s-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5z" />
              </svg>
            }
          />
          <PolicyListNavigation
            title="To Device Policies"
            items={MudCtx.mud.toDevicePolicy}
            active={activePolicy}
            onClick={(p) => {
              setACtivePolicyDirection("to-device");
              setActivePolicy(p);
            }}
            svg={
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                className="fill-current"
              >
                <path d="M9 9h-2v-7c0-1.104.896-2 2-2h10c1.104 0 2 .896 2 2v20c0 1.104-.896 2-2 2h-10c-1.104 0-2-.896-2-2v-7h2v4h10v-14.024h-10v4.024zm5 13c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm-2-11v-3l5 4-5 4v-3h-9v-2h9zm3.5-9h-3c-.276 0-.5.224-.5.5s.224.5.5.5h3c.276 0 .5-.224.5-.5s-.224-.5-.5-.5z" />
              </svg>
            }
          />
        </div>
        <div className="lg:col-span-6 lg:pl-4">
          <Policy
            direction={activePolicyDirection}
            acl={MudCtx.mud.acls.find((acl) =>
              acl.name == activePolicy ? acl : undefined
            )}
          />
        </div>
      </div>
    </>
  );
}

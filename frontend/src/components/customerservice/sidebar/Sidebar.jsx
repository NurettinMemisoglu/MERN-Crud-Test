import React from "react";
import Conversations from "./Conversations";

function sidebar() {
  return (
    <div className="border-r border-slate-500 flex fex-col overflow-auto mb-10 max-w-48 overflow-x-hidden">
      <Conversations />
    </div>
  );
}

export default sidebar;

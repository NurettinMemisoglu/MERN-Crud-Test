import React from "react";
import Conversations from "./Conversations";

function sidebar() {
  return (
    <div className="border-r border-slate-500 flex fex-col overflow-auto mb-10">
      <Conversations />
    </div>
  );
}

export default sidebar;

import React, { useContext } from "react";
import { context } from "../PlaySection/Context/ReactContext";
import "./statuspage.scss";
export default function StatusPage() {
  const { online } = useContext(context);
  return (
    <div className="statuspage-container">
      <h1 className="status_page_title">
        El servidor se encuentra{" "}
        <span className={online ? "statuspage_online" : "statuspage_offline"}>
          {online ? "Online" : "Offline"}
        </span>
      </h1>
    </div>
  );
}

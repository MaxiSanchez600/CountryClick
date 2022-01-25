import React from "react";
import { stylesheet } from "typestyle";
import { colors } from "../../Config/global";

const css = stylesheet({
  status_online: {
    padding: "0 1rem",
    fontSize: "1.1rem",
    color: colors.green,
  },
  status_offline: {
    padding: "0 1rem",
    fontSize: "1.1rem",
    color: colors.red,
  },
});

type Props = {
  status: boolean;
};

export default function Status(props: Props) {
  return (
    <h1 className={props.status ? css.status_online : css.status_offline}>
      {props.status ? "Online" : "Offline"}
    </h1>
  );
}

import { PropsWithChildren } from "react";
import classes from "./GridLayout.module.css";

type Props = {
  level?: number;
  isDisabled?: boolean;
  isDone?: boolean;
};
export default function GridLayout({
  children,
  isDisabled = false,
  isDone = false,
  level = 0,
}: PropsWithChildren<Props>) {
  return (
    <div
      style={{
        gridGap: level * 5 + "px",
      }}
      className={[
        classes.parent,
        isDisabled && classes.isDisabled,
        isDone && classes.isDone,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

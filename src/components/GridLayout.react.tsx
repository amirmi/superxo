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
        gridGap: level == 1 ? "3%" : "4%",
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

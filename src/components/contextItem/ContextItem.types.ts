import React from "react";

export interface IContextItemProps<T extends unknown>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  ctx: T;
  onClick?: (context: T, event: React.MouseEvent<HTMLDivElement>) => void;
}

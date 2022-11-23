import React, { PropsWithChildren, useCallback } from "react";
import { IContextItemProps } from "./ContextItem.types";
import { observer } from "mobx-react-lite";

export const ContextItem = observer(
  <T extends unknown = unknown>({
    children,
    ctx,
    onClick,
    ...rest
  }: PropsWithChildren<IContextItemProps<T>>) => {
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(ctx, event);
      },
      [ctx, onClick],
    );

    return (
      <div onClick={handleClick} {...rest}>
        {children}
      </div>
    );
  },
);

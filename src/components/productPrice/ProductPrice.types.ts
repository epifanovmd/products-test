import React from "react";

export interface IProductPriceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  suffix?: string;
  paint?: boolean;
}

export interface IProductItemColor {
  color: "red" | "green";
}

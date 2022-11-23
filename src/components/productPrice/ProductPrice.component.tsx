import React, { FC, memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IProductItemColor, IProductPriceProps } from "./ProductPrice.types";

export const ProductPrice: FC<IProductPriceProps> = memo(
  ({ price, suffix = "$", paint, ...rest }) => {
    const oldPrice = useRef(price);
    const [color, setColor] = useState<IProductItemColor["color"]>();

    useEffect(() => {
      if (!!price && oldPrice.current !== price && paint) {
        if (price > oldPrice.current) {
          setColor("red");
        }
        if (price < oldPrice.current) {
          setColor("green");
        }

        oldPrice.current = price;
        setTimeout(() => {
          setColor(undefined);
        }, 2000);
      }
      // eslint-disable-next-line
    }, [price]);

    return (
      <StyledPrice {...rest} color={color}>{`${price} ${suffix}`}</StyledPrice>
    );
  },
);

const StyledPrice = styled.div<Partial<IProductItemColor>>`
  display: flex;
  font-weight: 600;
  background: ${({ color }) => color || "#fff"};
`;

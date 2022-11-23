import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "../ui";
import styled from "styled-components";
import { ContextItem } from "../contextItem";
import { ProductPrice } from "../productPrice";
import { IProductsProps } from "./Product.types";

export const Product: FC<IProductsProps> = observer(
  ({ product, countInShoppingCart, onRemoveProduct, onAddProduct }) => (
    <Wrap>
      <Row>
        <Title>{"Название:"}</Title>
        <Value>{product.name}</Value>
      </Row>
      <Row>
        <Title>{"Цена:"}</Title>
        <ProductPrice price={product.price} paint={true} />
      </Row>
      <Row>
        <Title>{"Колличество:"}</Title>
        <Value>{product.count}</Value>
      </Row>

      {!countInShoppingCart && (
        <ContextItem ctx={product} onClick={onAddProduct}>
          <Button>В корзину</Button>
        </ContextItem>
      )}

      {!!countInShoppingCart && (
        <Row>
          <ContextItem ctx={product.id} onClick={onRemoveProduct}>
            <ChangeButton>-</ChangeButton>
          </ContextItem>

          <Count> {countInShoppingCart}</Count>

          {product.count > countInShoppingCart && (
            <ContextItem ctx={product} onClick={onAddProduct}>
              <ChangeButton>+</ChangeButton>
            </ContextItem>
          )}
        </Row>
      )}
    </Wrap>
  ),
);

const Wrap = styled.div`
  & + & {
    margin-top: 16px;
  }

  box-shadow: 0 5px 20px 0 #00000050;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  margin-right: 8px;
`;

const Value = styled.div`
  display: flex;
`;

const Row = styled.div`
  display: flex;
`;

const Count = styled.div`
  margin: 0 16px;
`;

const ChangeButton = styled.div`
  background: #4e4e4e4e;
  color: #fff;
  padding: 3px 8px;
  text-align: center;
  cursor: pointer;
`;

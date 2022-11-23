import React, { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { IShoppingCartProps } from "./ShoppingСart.types";
import styled from "styled-components";
import { Product } from "../product";
import { ProductPrice } from "../productPrice";
import { IProductsCartDataStore } from "../../store";

export const ShoppingCart: FC<IShoppingCartProps> = observer(() => {
  const store = IProductsCartDataStore.useInject();

  useEffect(() => {
    store.initialize();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrap>
      <Title>{`Корзина (${store.products.length} шт.)`}</Title>

      <Items>
        {store.products.map(product => (
          <Product
            key={product.id}
            product={product}
            countInShoppingCart={store.getProductCountById(product.id)}
            onAddProduct={store.onAddProduct}
            onRemoveProduct={store.onRemoveProduct}
          />
        ))}
      </Items>

      <PriceWrap>
        {"Общаяя стоимость:"}
        <Price price={store.allPrice} />
      </PriceWrap>
    </Wrap>
  );
});

const Wrap = styled.div`
  padding: 16px;
`;
const Items = styled.div`
  padding: 16px 0;
`;
const Title = styled.div`
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 16px;
`;
const PriceWrap = styled.div`
  display: flex;
  margin-top: 36px;
`;
const Price = styled(ProductPrice)`
  margin-left: 8px;
`;

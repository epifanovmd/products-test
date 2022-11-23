import React, { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Product } from "../product";
import styled from "styled-components";
import { IProductListVM } from "./ProductList.vm";
import { IProductListProps } from "./ProductList.types";

export const ProductList: FC<IProductListProps> = observer(() => {
  const vm = IProductListVM.useInject();

  useEffect(() => {
    vm.initialize().then();

    return () => {
      vm.dispose();
      console.log("dispose");
    };
    // eslint-disable-next-line
  }, []);

  console.log("vm.list", vm.list);

  return (
    <Wrap>
      <Title>{"Товары"}</Title>

      {vm.list.map(item => (
        <GroupWrap key={item.groupId}>
          <GroupName>{item.groupName}</GroupName>

          {item.products.map(product => (
            <Product
              key={product.id}
              product={product}
              countInShoppingCart={vm.productsCartDataStore.getProductCountById(
                product.id,
              )}
              onAddProduct={vm.productsCartDataStore.onAddProduct}
              onRemoveProduct={vm.productsCartDataStore.onRemoveProduct}
            />
          ))}

          <Line />
        </GroupWrap>
      ))}
    </Wrap>
  );
});

const Wrap = styled.div`
  padding: 16px;
`;
const Title = styled.div`
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const GroupWrap = styled.div``;

const GroupName = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 16px;
`;

const Line = styled.div`
  height: 1px;
  background: #000;
  margin: 36px 0;
`;

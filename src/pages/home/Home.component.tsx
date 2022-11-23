import React, { FC } from "react";
import Helmet from "react-helmet";
import { observer } from "mobx-react-lite";
import { IUsersProps } from "./Home.types";
import { ShoppingCart } from "../../components/shoppingСart/ShoppingСart.component";
import styled from "styled-components";
import { ProductList } from "../../components";

const Home: FC<IUsersProps> = observer(() => (
  <Wrap>
    <Helmet>
      <title>{"Список товаров"}</title>
    </Helmet>

    <Row>
      <Col>
        <ProductList />
      </Col>
      <Col>
        <ShoppingCart />
      </Col>
    </Row>
  </Wrap>
));

export default Home;

const Wrap = styled.div`
  padding: 32px 0;
`;
const Col = styled.div`
  box-shadow: 0 5px 20px 0 #00000050;
  flex-grow: 1;
  flex-basis: 0;
  margin: 0 16px;
`;
const Row = styled.div`
  display: flex;
`;

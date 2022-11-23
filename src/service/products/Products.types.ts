export type ProductNames = {
  [key in number]: {
    G: string;
    C?: number;
    B: {
      [key in number]: {
        N: string;
        T: string | number;
      };
    };
  };
};

export interface IProduct {
  B: boolean;
  C: number;
  CV: null;
  G: number;
  P: number;
  Pl: null;
  T: number;
}

export interface IProductsResponse {
  Error: string;
  Id: string;
  Success: boolean;
  Value: {
    Goods: IProduct[];
  };
}

export type IProductParsed = {
  id: number;
  groupId: number;
  groupName: string;
  name: string;
  price: number;
  count: number;
};

export interface IProductGroups {
  groupName: string;
  groupId: number;
  products: IProductParsed[];
}

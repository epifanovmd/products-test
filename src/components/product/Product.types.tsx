import { IProductParsed } from "../../service";

export interface IProductsProps {
  product: IProductParsed;
  countInShoppingCart?: number;
  onAddProduct?: (product: IProductParsed) => void;
  onRemoveProduct?: (id: number) => void;
}

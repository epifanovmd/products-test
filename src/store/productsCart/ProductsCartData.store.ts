import { makeAutoObservable, reaction } from "mobx";

import { IProductParsed } from "../../service";
import { iocDecorator } from "../../ioc";
import { DataHolder } from "../../common";
import { IProductsDataStore, ProductsDataStore } from "../products";

export const IProductsCartDataStore = iocDecorator<ProductsCartDataStore>(
  "IProductsCartDataStore",
);

@IProductsCartDataStore({ inSingleton: true })
export class ProductsCartDataStore {
  holder: DataHolder<{ [key in string]: { count: number; id: number } }> =
    new DataHolder();

  constructor(
    @IProductsDataStore() private _productsDataStore: ProductsDataStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });

    reaction(
      () => this.data,
      products => {
        localStorage.setItem("productsCart", JSON.stringify(products));
      },
    );
  }

  initialize() {
    this.holder.setData(
      JSON.parse(
        typeof window === "object"
          ? localStorage.getItem("productsCart") || "{}"
          : "{}",
      ),
    );
  }

  get products() {
    return Object.keys(this.data).reduce<IProductParsed[]>((acc, key) => {
      const product = this._productsDataStore.productMap[+key];

      if (product) {
        acc.push({ ...product, count: this.data[+key].count });
      }

      return acc;
    }, []);
  }

  get allPrice() {
    return Number(
      this.products
        .reduce<number>(
          (acc, product) => acc + product.price * this.data[product.id].count,
          0,
        )
        .toFixed(3),
    );
  }

  private get data() {
    return this.holder.d || {};
  }

  onAddProduct(product: IProductParsed) {
    const findProduct = this.data[product.id];

    if (findProduct) {
      this.holder.setData({
        ...this.data,
        [product.id]: {
          id: product.id,
          count: findProduct.count + 1,
        },
      });
    } else {
      this.holder.setData({
        ...this.data,
        [product.id]: { id: product.id, count: 1 },
      });
    }
  }

  onRemoveProduct(id: number) {
    const findProduct = this.data[id];

    if (findProduct) {
      if (findProduct.count === 1) {
        const newData = { ...this.data };

        delete newData[id];

        this.holder.setData(newData);
      } else {
        this.holder.setData({
          ...this.data,
          [id]: {
            id,
            count: findProduct.count - 1,
          },
        });
      }
    }
  }

  getProductCountById(id: number) {
    const findProduct = this.data[id];

    return findProduct?.count || 0;
  }
}

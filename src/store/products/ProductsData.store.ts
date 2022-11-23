import { makeAutoObservable, runInAction } from "mobx";

import {
  IProduct,
  IProductGroups,
  IProductParsed,
  IProductsService,
  ProductsService,
} from "../../service";
import { iocDecorator } from "../../ioc";
import { CollectionHolder, randomNumber } from "../../common";
import { groupBy } from "lodash";
import { IProductNamesDataStore, ProductNamesDataStore } from "../productNames";

export const IProductsDataStore =
  iocDecorator<ProductsDataStore>("IProductsDataStore");

@IProductsDataStore({ inSingleton: true })
export class ProductsDataStore {
  public holder: CollectionHolder<IProduct> = new CollectionHolder(
    IProductsDataStore.getInitialData() || [],
  );

  intervalId: NodeJS.Timer | undefined = undefined;
  dollarExchangeRate: number = 61;
  productMap: { [key in number]: IProductParsed } = {};

  constructor(
    @IProductsService() private _productsService: ProductsService,
    @IProductNamesDataStore()
    private _productNamesDataStore: ProductNamesDataStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  dispose() {
    this.holder.setData([]);
    this.intervalId && clearInterval(this.intervalId);
  }

  get error() {
    return this.holder.error;
  }

  get loading() {
    return this.holder.isLoading;
  }

  get loaded() {
    return this.holder.isReady;
  }

  get groupedList() {
    if (this._products && this._productNames) {
      const grouped = groupBy(
        this._products.map(item => {
          const product = {
            id: item.T,
            groupId: item.G,
            groupName: this._productNames?.[item.G]?.G,
            name: this._productNames?.[item.G]?.B[item.T]?.N,
            price: Number((item.C / this.dollarExchangeRate).toFixed(3)),
            count: item.P,
          };

          runInAction(() => {
            this.productMap[item.T] = product;
          });

          return product;
        }),
        item => item.groupId,
      );

      return Object.keys(grouped).map(key => ({
        groupId: +key,
        groupName: this._productNames?.[+key]?.G,
        products: grouped[key],
      })) as IProductGroups[];
    } else {
      return [];
    }
  }

  async onRefresh() {
    this.holder.setPullToRefreshing();
    const products = await this._productsService.getProducts();

    if (products.error || products.data?.Error) {
      this.holder.setError({
        msg: products.error?.toString() || products.data?.Error || "Ошибка",
      });
    } else if (products.data && products.data.Success) {
      this.holder.setData(products.data.Value.Goods);

      return products.data.Value.Goods;
    }

    return [];
  }

  onUpdatePrices() {
    if (typeof window === "object") {
      this.intervalId && clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        runInAction(() => {
          this.dollarExchangeRate = randomNumber(50, 80);
        });
      }, 20000);
    }
  }

  private get _productNames() {
    return this._productNamesDataStore.holder.d || [];
  }

  private get _products() {
    return this.holder.d || [];
  }
}

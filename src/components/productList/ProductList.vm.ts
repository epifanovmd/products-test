import { makeAutoObservable } from "mobx";
import {
  IProductNamesDataStore,
  IProductsCartDataStore,
  IProductsDataStore,
  ProductNamesDataStore,
  ProductsCartDataStore,
  ProductsDataStore,
} from "../../store";
import { iocDecorator } from "../../ioc";

export const IProductListVM = iocDecorator<ProductListVM>();

@IProductListVM()
class ProductListVM {
  private intervalId: NodeJS.Timer | undefined;

  constructor(
    @IProductsCartDataStore()
    public productsCartDataStore: ProductsCartDataStore,
    @IProductsDataStore() private _productsDataStore: ProductsDataStore,
    @IProductNamesDataStore()
    private _productNamesDataStore: ProductNamesDataStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get list() {
    return this._productsDataStore.groupedList;
  }

  async initialize() {
    await this._productNamesDataStore.onRefresh();
    await this.onRefresh().then();
    this.intervalId && clearInterval(this.intervalId);
    this.intervalId = setInterval(this.onRefresh, 15000);
  }

  dispose() {
    this._productsDataStore.dispose();
    this.intervalId && clearInterval(this.intervalId);
  }

  async onRefresh() {
    await this._productsDataStore.onRefresh();
    await this._productsDataStore.onUpdatePrices();
  }
}

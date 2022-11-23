import { makeAutoObservable } from "mobx";

import { IProductsService, ProductNames, ProductsService } from "../../service";
import { iocDecorator } from "../../ioc";
import { DataHolder } from "../../common";

export const IProductNamesDataStore = iocDecorator<ProductNamesDataStore>(
  "IProductNamesDataStore",
);

@IProductNamesDataStore({ inSingleton: true })
export class ProductNamesDataStore {
  public holder: DataHolder<ProductNames> = new DataHolder(
    IProductNamesDataStore.getInitialData() || [],
  );

  constructor(@IProductsService() private _productsService: ProductsService) {
    makeAutoObservable(this, {}, { autoBind: true });
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

  async onRefresh() {
    const res = await this._productsService.getNames();

    if (res.error) {
      this.holder.setError({
        msg: res.error?.toString() || "Ошибка",
      });
    } else if (res.data) {
      this.holder.setData(res.data);

      return res.data;
    }

    return [];
  }
}

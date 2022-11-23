import { apiService } from "../../api";
import { IProductsResponse, ProductNames } from "./Products.types";
import { iocDecorator } from "../../ioc";

export const IProductsService = iocDecorator<ProductsService>();

@IProductsService()
export class ProductsService {
  getProducts() {
    return apiService.get<IProductsResponse>("/products.json");
  }
  getNames() {
    return apiService.get<ProductNames>("/names.json");
  }
}

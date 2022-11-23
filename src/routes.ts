import loadable from "@loadable/component";
import { IProductsDataStore, IProductNamesDataStore } from "./store";

const Home = loadable(() => import("./pages/home/Home.component"));

type GetInitialData = [string, () => Promise<any>];

export interface IRoute<T extends string = string> {
  path: string;
  pathName: T;
  component: any;
  children?: IRoute[];
  getInitialData?: GetInitialData[];
}

export enum routepaths {
  Home = "/",
}

export type RoutePaths = routepaths | string;

export const routes: IRoute[] = [
  {
    path: routepaths.Home,
    pathName: "home",
    component: Home,
    getInitialData: [
      [
        IProductNamesDataStore.Tid,
        IProductNamesDataStore.getInstance().onRefresh,
      ],
      [IProductsDataStore.Tid, IProductsDataStore.getInstance().onRefresh],
    ],
  },
];

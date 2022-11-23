import { AxiosRequestConfig } from "axios";

export interface ApiResponse<R> {
  data?: R;
  error?: Error;
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  useRaceCondition?: boolean;
}

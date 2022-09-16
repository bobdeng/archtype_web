import axios, {AxiosRequestConfig} from "axios";
import {NewCommodityForm} from "@/api/CommodityForms";

const config: AxiosRequestConfig = {
  validateStatus: () => true
}

export async function ajax(fun: any) {
  const response = await fun();
  if (response.status === 200) {
    return Promise.resolve(response.data);
  }
  if (!response.data) {
    return Promise.reject(response.status)
  }
  if (Array.isArray(response.data)) {
    return Promise.reject(response.data.map((error: any) => error.error).join("；"))
  }
  return Promise.reject(response.data)
}

export const server = {
  async newCommodity(form: NewCommodityForm) {
    return await ajax(() => axios.post("/api/1.0/commodities", form, config))
  }
}
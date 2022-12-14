import axios, { AxiosInstance } from 'axios'
import { inject, InjectionKey } from 'vue'

export const API_TOKEN: InjectionKey<AxiosInstance> = Symbol('api token')

export function useApi() {
  return inject(API_TOKEN, axios)
}

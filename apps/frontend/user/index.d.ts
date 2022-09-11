import { AxiosInstance } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare global {
  interface Window {
    __FETCH_LIB: AxiosInstance
  }
}

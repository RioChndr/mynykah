import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { configUseAuth } from "../auth/config";

const isServer = () => {
  return typeof window === "undefined"
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
let accessToken = "";
let context = <GetServerSidePropsContext>{};

/**
 * Axios instance here !!
 */
export const api = axios.create({
  baseURL,
})

export const setAccessToken = (token: string) => {
  accessToken = token
}

export const getAccessToken = () => (accessToken)

/** 
 * for axios that run on SSR, please run this first !
 */
export const apiSetContextSSR = (_context: GetServerSidePropsContext) => context = _context


/** run on local browser and server */
export const getAccessTokenLocal = () => {
  if (isServer()) {
    const _token = context?.req?.cookies[configUseAuth.storage.localToken]
    setAccessToken(_token)
    return;
  };
  const _token = localStorage.getItem(configUseAuth.storage.localToken)
  setAccessToken(_token)
}

api.interceptors.request.use((config) => {
  if (!accessToken) {
    getAccessTokenLocal()
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

/**
 * for now there is no refresh-token.
 * i have no time to create that logic.
 */
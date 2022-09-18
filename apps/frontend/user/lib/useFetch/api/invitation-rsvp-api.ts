import useSWR from "swr";
import { api } from "../api";
import { SwrHooks } from "../fetcher";
import { PaginationQuery, PaginationResponse } from "./type";

export function apiRsvpJoin(data: {
  cardId: string,
  name: string,
  totalPerson: number,
  gift?: number,
}) {
  return api.post('/api/invitation-rsvp/join', data)
}

export function apiRsvpNotJoin(data: {
  cardId: string,
  name: string,
  reason?: string,
  gift?: number,
}) {
  return api.post('/api/invitation-rsvp/not-join', data)
}

export function apiRsvpTotal(cardId: string) {
  return SwrHooks<{
    _count: {
      status: number
    },
    _sum: {
      person: number,
      gift: number
    },
    status: string
  }[]>(
    useSWR(`/api/invitation-rsvp/${cardId}/total`),
  )
}

export function apiRsvpList(cardId: string, querySearch: PaginationQuery | any) {
  const query = new URLSearchParams(querySearch as any).toString()
  return SwrHooks<PaginationResponse<RSVPItem>>(
    useSWR(`/api/invitation-rsvp/${cardId}/list?${query}`),
  )
}

export interface RSVPItem {
  id: string,
  status: string,
  name: string,
  person: number,
  gift: number,
  reason?: string,
  createdAt: Date,
  updatedAt: Date
}
import { api } from "../api";

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
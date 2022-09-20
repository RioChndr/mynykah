import useSWR from "swr";
import { api } from "../api";
import { SwrHooks } from "../fetcher";

export function apiInvitationGalleryList(idCard: string) {
  const url = `/api/invitation-card-gallery/list-by-card?idCard=${idCard}`;
  return SwrHooks<InvitationGalleryItem[]>(useSWR(url))
}

export function apiInvitationGalleryCreate(data: any) {
  return api.post('/api/invitation-card-gallery', data)
}

export function apiInvitationGalleryDelete(id: string) {
  return api.delete(`/api/invitation-card-gallery/${id}`)
}

export function apiInvitationGalleryLikesToggle(id: string) {
  return api.put(`/api/invitation-card-gallery/toggle-like/${id}`)
}

export interface InvitationGalleryItem {
  id: string;
  cardId: string;
  caption: string;
  image: string;
  totalLikes: number;
  createdAt: string;
  deleteAt?: any;
}
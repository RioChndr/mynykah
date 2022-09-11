import useSWR from 'swr';
import { api } from '../api';
import { fetcher, SwrHooks } from "../fetcher";
import { InvitationCard, InvitationCardGallery } from "@prisma/client";

export interface DataInvitationCard extends InvitationCard {
  galleries?: InvitationCardGallery[]
}

export function useInvitationCardList() {
  return SwrHooks<DataInvitationCard[]>(
    useSWR(
      '/api/invitation-card/list',
      {
        refreshInterval: 10 * 1000
      }
    ),
  )
}

export function useInvitationCardDetail(id: string) {
  return SwrHooks<DataInvitationCard>(
    useSWR(`/api/invitation-card/detail/${id}`),
  )
}

export interface DataInvitationCardCreate {
  nameMale?: string
  nameFemale?: string
  date?: string
  location?: string
  locationCoord?: string
  fileImageCouple?: string | File
  fileImageThumbnail?: string | File
}

export function apiInvitationCardCreate(data: FormData) {
  return api.post('/api/invitation-card/create', data)
}

export function apiInvitationCardDetail(id: string) {
  return SwrHooks<DataInvitationCard>(
    useSWR(
      '/api/invitation-card/detail/' + id,
    ),
  )
}

export function apiInvitationCardUpdate(id: string, data: any) {
  return api.put('/api/invitation-card/update/' + id, data)
}
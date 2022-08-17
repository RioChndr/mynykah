import useSWR from 'swr';
import { fetcher, SwrHooks } from "../fetcher";

export interface DataInvitationCard {
  id?: string
  alias?: string
  userId?: string
  nameMale?: string
  nameFemale?: string
  date?: string
  location?: string
  locationCoord?: string
  imageCouple?: string
  imageThumbnail?: string
  rsvpText?: string
  createdAt?: string
}

export function useInvitationCardList() {
  return SwrHooks<DataInvitationCard[]>(
    useSWR(
      '/api/invitation-card/list',
      fetcher,
      {
        refreshInterval: 1000
      }
    ),
  )
}
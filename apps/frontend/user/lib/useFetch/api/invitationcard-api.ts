import useSWR from 'swr';
import { api, apiSetContextSSR } from '../api';
import { fetcher, SwrHooks } from "../fetcher";
import { InvitationCard, InvitationCardGallery } from "@prisma/client";
import { GetServerSidePropsContext } from 'next';

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

export function apiInvitationCardDetailSSR(id: string) {
  return api.get<DataInvitationCard>('/api/invitation-card/detail/' + id)
}

export function apiInvitationCardUpdate(id: string, data: any) {
  return api.put('/api/invitation-card/update/' + id, data)
}

export function apiInvitationCardIsOwner(id: string) {
  return api.get('/api/invitation-card/is-owner/' + id)
}

export function apiInvitationCardIsOwnerSwr(id: string) {
  return SwrHooks(useSWR('/api/invitation-card/is-owner/' + id))
}

export async function apiInvitationCardSSRProps(context: GetServerSidePropsContext, props: { throwIfNotOwner?: boolean } = {}) {
  const id = context.query.id as string
  apiSetContextSSR(context)

  try {
    if (props.throwIfNotOwner) {
      await apiInvitationCardIsOwner(id)
    }
    const data = await apiInvitationCardDetailSSR(id)
    return {
      props: {
        data: data.data,
      }
    }
  } catch (err) {
    console.log(err)
    return {
      redirect: {
        permanent: false,
        destination: `/invitation/${id}`,
      }
    }
  }
}

export function apiInvitationCardUpdateThumbnail(id: string, data: FormData) {
  return api.put('/api/invitation-card/update-thumbnail/' + id, data)
}
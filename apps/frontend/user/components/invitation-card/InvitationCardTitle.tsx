import { DataInvitationCard } from "../../lib/useFetch/api/invitationcard-api";
import { TextNameCouple } from "../../lib/utils/text-utils";
import { HeadTitle } from "../common/HeadTitle";

export function InvitationCardTitle(props: { data: Partial<DataInvitationCard>, suffix?: string }) {
  const { data, suffix } = props
  if (!data) return <></>
  return (
    <HeadTitle title={`${TextNameCouple(data.nameFemale, data.nameMale)} ${suffix || ''}`}></HeadTitle>
  )
}
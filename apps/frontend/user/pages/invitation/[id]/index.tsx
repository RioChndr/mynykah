import { InvitationCardTitle } from "apps/frontend/user/components/invitation-card/InvitationCardTitle"
import { PageInvitationLayout } from "apps/frontend/user/components/invitation-card/PageInvitation"
import { apiInvitationCardSSRProps, DataInvitationCard } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { GetServerSidePropsContext } from "next"

export function InviationIndexPage(props: { data: DataInvitationCard }) {
  return (
    <>
      <InvitationCardTitle data={props.data}></InvitationCardTitle>
      <PageInvitationLayout data={props.data} rsvp={true} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await apiInvitationCardSSRProps(context)
}

export default InviationIndexPage
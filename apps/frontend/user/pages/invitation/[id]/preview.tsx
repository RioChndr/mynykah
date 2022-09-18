import { PageInvitationLayout } from "apps/frontend/user/components/invitation-card/PageInvitation"
import { apiInvitationCardSSRProps } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { GetServerSidePropsContext } from "next"

export function InviationIndexPagePreview(props: any) {
  return (
    <PageInvitationLayout
      isEditable={true}
      data={props.data}
    />
  )
}

/**
 * Redirect if not owner
 * @param context 
 * @returns 
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await apiInvitationCardSSRProps(context, {
    throwIfNotOwner: true,
  })
}

export default InviationIndexPagePreview
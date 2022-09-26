import { Box, Container, Text } from "@chakra-ui/react"
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack"
import { InvitationCardTitle } from "apps/frontend/user/components/invitation-card/InvitationCardTitle"
import { InvitationForm } from "apps/frontend/user/components/invitation-card/InvitationForm"
import { InvitationHeaderPage } from "apps/frontend/user/components/invitation-card/InvitationHeaderPage"
import { apiInvitationCardDetail, apiInvitationCardSSRProps, apiInvitationCardUpdate } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import _ from "lodash"
import Router, { useRouter } from "next/router"
import { useState } from "react"
import { urlPageInvitationDetail } from "../detail"

export function InviteCardEditInfo({ data }) {
  const router = useRouter()
  const id = router.query.id as string

  return (
    <Container display='flex' flexDir='column' gap="6">
      <InvitationCardTitle data={data} suffix="Edit Info"></InvitationCardTitle>
      <InvitationHeaderPage backTo={urlPageInvitationDetail(id)} data={data}></InvitationHeaderPage>

      <SectionEdit id={id} />
    </Container>
  )
}

function SectionEdit({ id }) {
  const { data, isError: errorFetch, isLoading: loadingFetch } = apiInvitationCardDetail(id)

  const initialValues = data || {
    nameMale: '',
    nameFemale: '',
    date: '',
    location: '',
    locationCoord: '',
  }

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values) => {
    setIsLoading(true)
    try {
      const data = _.omit(values, [
        'galleries',
        'id',
        'imageThumbnail'
      ])
      console.log(data)
      await apiInvitationCardUpdate(id, data)
      Router.replace('/dashboard/invite-card/' + id + "/detail")
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  if (loadingFetch) return <Text>Loading ...</Text>
  if (errorFetch) {
    return <Text textColor='red'>Failed fetch data</Text>
  }
  return (
    <InvitationForm
      loading={isLoading}
      onSubmit={onSubmit}
      data={initialValues}
      title={'Edit Halaman Undangan'}
      hideFile={true}
    />
  )
}

export default InviteCardEditInfo

export async function getServerSideProps(context: any) {
  return await apiInvitationCardSSRProps(context, {
    throwIfNotOwner: true,
  })
}
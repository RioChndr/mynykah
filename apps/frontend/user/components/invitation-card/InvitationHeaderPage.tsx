import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { apiInvitationCardDetail } from "../../lib/useFetch/api/invitationcard-api";
import { ButtonBack } from "../common/ButtonBack";
import { ButtonOpenInvitationCard } from "./HelperComponent";

export function InvitationHeaderPage({ backTo = null }) {
  const router = useRouter()
  const id = router.query.id as string
  const { data } = apiInvitationCardDetail(id)

  return (
    <>
      <Flex justifyContent='space-between'>
        <Flex gap='3' alignItems='center'>
          <ButtonBack to={backTo}></ButtonBack>
          <Text fontSize='lg'>
            {data ? `${data.nameMale} dan ${data.nameFemale}` : ''}
          </Text>
        </Flex>
        <ButtonOpenInvitationCard id={id} />
      </Flex>
    </>
  )
}
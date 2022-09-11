import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiArrowUpRight } from "react-icons/fi";
import { apiInvitationCardDetail } from "../../lib/useFetch/api/invitationcard-api";
import { ButtonBack } from "../common/ButtonBack";
import { ButtonOpenInvitationCard } from "./ButtonOpen";

export function InvitationHeaderPage() {
  const router = useRouter()
  const id = router.query.id as string
  const { data } = apiInvitationCardDetail(id)

  return (
    <>
      <Flex justifyContent='space-between'>
        <Flex gap='3' alignItems='center'>
          <ButtonBack></ButtonBack>
          <Text fontSize='lg'>
            {data ? `${data.nameMale} dan ${data.nameFemale}` : ''}
          </Text>
        </Flex>
        <ButtonOpenInvitationCard id={id} />
      </Flex>
    </>
  )
}
import { Flex, Text } from "@chakra-ui/react";
import { DataInvitationCard } from "../../lib/useFetch/api/invitationcard-api";
import { ButtonBack } from "../common/ButtonBack";
import { ButtonOpenInvitationCard } from "./HelperComponent";

export function InvitationHeaderPage({ backTo = null, data }: { backTo?: string, data: Partial<DataInvitationCard> }) {
  return (
    <>
      <Flex justifyContent='space-between'>
        <Flex gap='3' alignItems='center'>
          <ButtonBack to={backTo}></ButtonBack>
          <Text fontSize='lg'>
            {data ? `${data.nameMale} dan ${data.nameFemale}` : ''}
          </Text>
        </Flex>
        <ButtonOpenInvitationCard id={data.id} />
      </Flex>
    </>
  )
}
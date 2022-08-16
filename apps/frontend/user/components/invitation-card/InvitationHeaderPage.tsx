import { Button, Flex, Text } from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import { ButtonBack } from "../common/ButtonBack";

export function InvitationHeaderPage({name}){
  return (
    <>
      <Flex justifyContent='space-between'>
        <ButtonBack></ButtonBack>
        <Button rightIcon={<FiArrowUpRight />}>
          Buka undangan
        </Button>
      </Flex>
      <Text fontSize='lg'>
        {name}
      </Text>
    </>
  )
}
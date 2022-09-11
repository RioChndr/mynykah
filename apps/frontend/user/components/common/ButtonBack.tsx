import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import Router from "next/router";
import { FiChevronLeft } from "react-icons/fi";

export function ButtonBack(){
  return (
    <Button
      variant='outline'
      leftIcon={<FiChevronLeft />}
      colorScheme='gray'
      onClick={() => Router.back()}
    >
      <Text>
        Kembali
      </Text>
    </Button>
  )
}
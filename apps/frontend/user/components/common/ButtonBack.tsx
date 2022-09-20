import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import Router from "next/router";
import { FiChevronLeft } from "react-icons/fi";

export function ButtonBack(props: { to?: string }) {
  return (
    <Button
      variant='outline'
      leftIcon={<FiChevronLeft />}
      colorScheme='gray'
      onClick={() => props.to ? Router.push(props.to) : Router.back()}
    >
      <Text>
        Kembali
      </Text>
    </Button>
  )
}
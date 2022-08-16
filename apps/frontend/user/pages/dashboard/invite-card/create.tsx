import { Box, Button, Center, Container, Flex, Heading, Input, Text } from "@chakra-ui/react"
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack"
import { InvitationForm } from "apps/frontend/user/components/invitation-card/InvitationForm"

export function InviteCardCreate(){
  return (
    <Container display='flex' flexDir='column' gap="6">
      <Box>
        <ButtonBack></ButtonBack>
      </Box>
      <InvitationForm />
    </Container>
  )
}

export default InviteCardCreate
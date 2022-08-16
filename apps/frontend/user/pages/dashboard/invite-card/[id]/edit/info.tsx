import { Box, Container } from "@chakra-ui/react"
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack"
import { InvitationForm } from "apps/frontend/user/components/invitation-card/InvitationForm"

export function InviteCardEditInfo(){
  return (
    <Container display='flex' flexDir='column' gap="6">
      <Box>
        <ButtonBack></ButtonBack>
      </Box>
      <InvitationForm title="Edit informasi undangan" />
    </Container>
  )
}

export default InviteCardEditInfo
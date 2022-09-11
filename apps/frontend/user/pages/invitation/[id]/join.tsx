import { Box, Button, Center, Container, Flex, Grid, Heading, Input, Stack } from "@chakra-ui/react"
import { InvitationContainer } from "../../../components/invitation-card/Container"
import { InvitationFormGift } from "../../../components/invitation-card/FormGift"

export function InvitationJoin() {


  return (
    <InvitationContainer>
      <Flex w='full' justifyContent='center'>
        <Stack w={{ sm: 'full', md: '50%' }} spacing='6'>
          <Heading size='lg' textAlign='center'>
            RSVP Hadir
          </Heading>
          <Input placeholder="Nama" />
          <Stack>
            <Heading size='lg' textAlign='center'>
              Gift / Hadiah
            </Heading>
            <InvitationFormGift />
          </Stack>
          <Button>
            Saya akan Hadir
          </Button>
        </Stack>
      </Flex>
    </InvitationContainer>
  )
}

export default InvitationJoin
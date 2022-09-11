import { Box, Button, Center, Checkbox, Container, Flex, Grid, Heading, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import { InvitationContainer } from "../../../components/invitation-card/Container"
import { InvitationFormGift } from "../../../components/invitation-card/FormGift"

export function InvitationNotJoin() {
  const reasons = [
    'Saya sibuk',
    'Anak saya kabur',
    'Mager',
    'Lainnya'
  ]

  return (
    <InvitationContainer>
      <Flex w='full' justifyContent='center'>
        <Stack w={{ sm: 'full', md: '50%' }} spacing='6'>
          <Heading size='lg' textAlign='center'>
            RSVP Tidak Hadir
          </Heading>
          <Input placeholder="Nama" />
          <RadioGroup>
            <Stack>
              <Heading size='md'>
                Alasan
              </Heading>
              {reasons.map((v) => (
                <Radio value={v}>{v}</Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Stack>
            <Heading size='lg' textAlign='center'>
              Gift / Hadiah
            </Heading>
            <InvitationFormGift />
          </Stack>
          <Button colorScheme="gray">
            Saya tidak Hadir
          </Button>
        </Stack>
      </Flex>
    </InvitationContainer>
  )
}

export default InvitationNotJoin
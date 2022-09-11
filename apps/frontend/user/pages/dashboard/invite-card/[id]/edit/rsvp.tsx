import { Button, Container, Flex, Table, TableCaption, TableContainer, Tbody, Td, Textarea, Th, Thead, Tr } from "@chakra-ui/react"
import { HeadingSection } from "apps/frontend/user/components/common/HeadingSection"
import { InvitationHeaderPage } from "apps/frontend/user/components/invitation-card/InvitationHeaderPage"

export function InvitationCardEditRsvp() {
  return (
    <Container display='flex' gap='6' flexDirection='column'>
      <InvitationHeaderPage name="Undangan Rio chandra dan nabilla" />
      <HeadingSection
        title="RSVP"
        description="RSVP dicantumkan untuk memberitahu tamu bahwa mereka perlu melakukan konfirmasi sebelum menghadiri acaranya"
        switchShow
      />
      <Flex direction='column' gap='3'>
        <HeadingSection
          title="Edit pesan"
          description="RSVP dicantumkan untuk memberitahu tamu bahwa mereka perlu melakukan konfirmasi sebelum menghadiri acaranya"
        >
          <Button size="sm">
            Simpan
          </Button>
        </HeadingSection>
        <Textarea placeholder="Pesan harap dijawab"></Textarea>
      </Flex>
      <Flex direction='column' gap='3'>
        <HeadingSection
          title="Orang yang menghadiri undangan"
          description="RSVP dicantumkan untuk memberitahu tamu bahwa mereka perlu melakukan konfirmasi sebelum menghadiri acaranya"
        >
        </HeadingSection>
        <TableGuest />
      </Flex>
    </Container>
  )
}

export default InvitationCardEditRsvp

function TableGuest(){
  const data = [
    ['Segun Adebayo', '2022-02-01'],
    ['Mark Chandler', '2022-02-01'],
    ['Lazar Nikolov', '2022-02-01'],
    ['Javier Alaves', '2022-02-01'],
  ]

  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>Total 529 Orang Menghadiri undangan</TableCaption>
        <Thead bg='primary'>
          <Tr>
            <Th textColor='white'>
              Nama
            </Th>
            <Th textColor='white'>
              Tanggal
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((v) => (
            <Tr>
              <Td>{v[0]}</Td>
              <Td>{v[1]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
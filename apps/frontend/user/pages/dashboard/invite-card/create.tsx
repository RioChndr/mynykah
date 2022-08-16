import { Box, Button, Center, Container, Flex, Heading, Input, Text } from "@chakra-ui/react"
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack"

export function InviteCardCreate(){
  return (
    <Container display='flex' flexDir='column' gap="6">
      <Box>
        <ButtonBack></ButtonBack>
      </Box>
      <Flex direction='column' gap='3'>
        <Heading size='md'>
          Form buat undangan baru
        </Heading>
        <Text>
          Kabarkan dimana dan kapan acara ini dimulai
        </Text>
        <Input placeholder="Nama pasangan Laki-laki"/>
        <Input placeholder="Nama pasangan Perempuan"/>
        <Input placeholder="Tanggal menikah"/>
        <Input placeholder="Lokasi"/>
      </Flex>

      <Flex direction='column' gap='3'>
        <Heading size='md'>
          Foto undangan
        </Heading>
        <Text>
          Abadikan kenangan anda dan beri tahu semua orang
        </Text>
        <Input placeholder="Foto Kebersamaan"/>
        <Input placeholder="Foto thumbnail besar"/>
      </Flex>
      <Center>
        <Button>
          Simpan
        </Button>
      </Center>
    </Container>
  )
}

export default InviteCardCreate
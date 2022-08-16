import { Button, Center, Flex, Heading, Input, Text } from "@chakra-ui/react";

interface InvitationFormProps {
  title?: string
  onClick?: () => any
}

export function InvitationForm(props: InvitationFormProps){
  return (
    <>
      <Flex direction='column' gap='3'>
        <Heading size='md'>
          {props.title ?? 'Form buat undangan baru'}
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
    </>
  )
}
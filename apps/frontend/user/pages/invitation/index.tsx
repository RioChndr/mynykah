import { Button, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"
import { CardGalleryCuteList, CardGalleryCuteProps } from "../../components/invitation-card/CardGallery"
import { InvitationCardThumbnail } from "../../components/invitation-card/CardThumbnail"
import { InvitationContainer } from "../../components/invitation-card/Container"

export function InviationIndexPage() {

  const list: CardGalleryCuteProps[] = [
    {
      title: "Foto kami dong",
      description: "lorem ipsum dolor sit amet",
      src: "https://picsum.photos/500/600",
    },
    {
      title: "Foto kami dong",
      description: "lorem ipsum dolor sit amet",
      src: "https://picsum.photos/500/600",
    },
    {
      title: "Foto kami dong",
      description: "lorem ipsum dolor sit amet",
      src: "https://picsum.photos/500/600",
    },
    {
      title: "Foto kami dong",
      description: "lorem ipsum dolor sit amet",
      src: "https://picsum.photos/500/600",
    },
    {
      title: "Video kami bersama",
      description: "lorem ipsum dolor sit amet",
      src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      type: 'video',
    }
  ]

  function TitleSection({ text }) {
    return (
      <Heading size='md'>
        {text}
      </Heading>
    )
  }

  return (
    <InvitationContainer>
      <Stack>
        <TitleSection text='📝 Informations' />
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </Stack>
      <Stack>
        <TitleSection text='📷 Galeri' />
        <CardGalleryCuteList items={list} />
      </Stack>
      <Stack>
        <TitleSection text='📅 Date & Time' />
        <Text>
          Saturday, 10 januari 2022
        </Text>
      </Stack>
      <Stack>
        <TitleSection text='📍 Locations' />
        <Text>
          jl. abas, samsudin. lorem ipsum
        </Text>
      </Stack>
      <Stack>
        <TitleSection text='⌛ Rundown Acara' />
        <Text>
          Pagi : Akad <br />
          Siang : dakad <br />
          Malam : dangdut <br />
        </Text>
      </Stack>
      <Stack>
        <Heading fontSize='md' textAlign='center'>
          20 Orang lain menghadiri undangan ini
        </Heading>
        <Flex justifyContent='center' gap='3'>
          <Link href='/invitation/not-join' passHref>
            <Button colorScheme="gray" variant='outline'>
              Saya Tidak Hadir
            </Button>
          </Link>

          <Link href='/invitation/join' passHref>
            <Button as='a'>
              Saya Hadir
            </Button>
          </Link>
        </Flex>
      </Stack>
    </InvitationContainer>
  )
}

export default InviationIndexPage
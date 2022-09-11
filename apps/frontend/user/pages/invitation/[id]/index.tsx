import { Box, Button, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { DataInvitationCard } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { DateLocale, DateOnlyLocale } from "apps/frontend/user/lib/utils/text-utils"
import Link from "next/link"
import { CardGalleryCuteList, CardGalleryCuteProps } from "../../../components/invitation-card/CardGallery"
import { InvitationCardThumbnail } from "../../../components/invitation-card/CardThumbnail"
import { InvitationContainer } from "../../../components/invitation-card/Container"

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
      {(props: DataInvitationCard) => (
        <>
          <Stack>
            <TitleSection text='📝 Informations' />
            <Text>
              {props.information}
            </Text>
          </Stack>
          <Stack>
            <TitleSection text='📷 Galeri' />
            <CardGalleryCuteList items={list} />
          </Stack>
          <Stack>
            <TitleSection text='📅 Date & Time' />
            <Text>
              {DateOnlyLocale(props.date)}
            </Text>
          </Stack>
          <Stack>
            <TitleSection text='📍 Locations' />
            <Text>
              {props.location}
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
              <Link href={`/invitation/${props.id}/not-join`} passHref>
                <Button colorScheme="gray" variant='outline'>
                  Saya Tidak Hadir
                </Button>
              </Link>

              <Link href={`/invitation/${props.id}/join`} passHref>
                <Button as='a'>
                  Saya Hadir
                </Button>
              </Link>
            </Flex>
          </Stack>
        </>
      )}
    </InvitationContainer>
  )
}

export default InviationIndexPage
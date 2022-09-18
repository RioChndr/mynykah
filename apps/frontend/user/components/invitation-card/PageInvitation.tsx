import { Box, Button, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import Link from "next/link";
import { DataInvitationCard } from "../../lib/useFetch/api/invitationcard-api";
import { DateOnlyLocale } from "../../lib/utils/text-utils";
import { CardGalleryCuteList, CardGalleryCuteProps } from "./CardGallery";
import { InvitationContainer } from "./Container";

function TitleSection({ text }) {
  return (
    <Heading size='md'>
      {text}
    </Heading>
  )
}

export interface PageInviationProps {
  data: DataInvitationCard
  isEditable?: boolean
  rsvp?: boolean
}

export function PageInvitationLayout(props: PageInviationProps) {
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

  return (
    <InvitationContainer isEditable={props.isEditable} data={props.data}>
      {(data: DataInvitationCard) => (
        <>
          <Stack>
            <TitleSection text='📝 Informations' />
            <Text>
              {data.information}
            </Text>
          </Stack>
          <Stack>
            <TitleSection text='📷 Galeri' />
            <CardGalleryCuteList items={list} />
          </Stack>
          <Stack>
            <TitleSection text='📅 Date & Time' />
            <Text>
              {DateOnlyLocale(data.date)}
            </Text>
          </Stack>
          <Stack>
            <TitleSection text='📍 Locations' />
            <Text>
              {data.location}
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
          {props.rsvp && <Stack>
            <Heading fontSize='md' textAlign='center'>
              20 Orang lain menghadiri undangan ini
            </Heading>
            <Flex justifyContent='center' gap='3'>
              <Link href={`/invitation/${data.id}/not-join`} passHref>
                <Button colorScheme="gray" variant='outline'>
                  Saya Tidak Hadir
                </Button>
              </Link>

              <Link href={`/invitation/${data.id}/join`} passHref>
                <Button as='a'>
                  Saya Hadir
                </Button>
              </Link>
            </Flex>
          </Stack>}
        </>
      )}
    </InvitationContainer>
  )
}
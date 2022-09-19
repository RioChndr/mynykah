import { Box, Button, Container, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import Link from "next/link";
import { useRouter } from "next/router";
import { DataInvitationCard } from "../../lib/useFetch/api/invitationcard-api";
import { DateOnlyLocale } from "../../lib/utils/text-utils";
import { CardGalleryCuteList, CardGalleryCuteProps } from "./CardGallery";
import { InvitationContainer } from "./Container";
import { SummaryRsvp } from "./RSVPSummary";

function TitleSection({ text, }) {
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
  const listGallery: CardGalleryCuteProps[] = [
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

  function TitleSectionInformation({ text }) {
    const router = useRouter()
    const idCard = router.query.id
    const urlEdit = `/dashboard/invite-card/${idCard}/edit/info`
    return (
      <Flex justify='space-between'>
        <TitleSection text={text} />
        {props.isEditable && (
          <Link href={urlEdit} passHref>
            <Button as='a' variant={'outline'} size='sm'>
              Edit
            </Button>
          </Link>
        )}
      </Flex>
    )
  }

  return (
    <InvitationContainer data={props.data}>
      {(data: DataInvitationCard) => (
        <>
          <Stack>
            <TitleSectionInformation text='💖 Cerita Kita' />
            <Text>
              {data.information}
            </Text>
          </Stack>
          <Stack>
            <TitleSection text='📷 Galeri' />
            <CardGalleryCuteList items={listGallery} />
          </Stack>
          <Stack>
            <TitleSectionInformation text='📅 Tanggal' />
            <Text>
              {DateOnlyLocale(data.date)}
            </Text>
          </Stack>
          <Stack>
            <TitleSectionInformation text='📍 Lokasi' />
            <Text>
              {data.location}
            </Text>
          </Stack>
          <Stack>
            <TitleSectionInformation text='⌛ Agenda Acara' />
            <Text style={{ whiteSpace: 'pre-wrap' }}>
              {data.agenda}
            </Text>
          </Stack>
          <Stack>
            <SummaryRsvp idCard={data.id} isPreview={props.isEditable} />
            {props.rsvp && <Flex justifyContent='center' gap='3'>
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
            </Flex>}
          </Stack>
        </>
      )}
    </InvitationContainer>
  )
}
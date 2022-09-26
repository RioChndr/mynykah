import { Box, Button, Container, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import Link from "next/link";
import { useRouter } from "next/router";
import { imageUploadUrl } from "../../lib/file-helper/image-upload-url";
import { DataInvitationCard } from "../../lib/useFetch/api/invitationcard-api";
import { DateOnlyLocale, TextNameCouple } from "../../lib/utils/text-utils";
import { CardGalleryCuteList, CardGalleryCuteProps } from "./CardGallery";
import { InvitationContainer } from "./Container";
import { SummaryRsvp } from "./RSVPSummary";
import { urlPageInvitationGalleryEdit } from "../../pages/dashboard/invite-card/[id]/edit/gallery";
import { apiInvitationGalleryLikesToggle } from "../../lib/useFetch/api/invitation-gallery-api";
import { useAuth } from "../../lib/auth/useAuth";
import { configUseAuth } from "../../lib/auth/config";

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
  let listGallery: CardGalleryCuteProps[] = []
  const router = useRouter()
  const authContext = useAuth()
  const idCard = router.query.id as string

  if (props?.data?.galleries) {
    listGallery = props.data.galleries.map((item, i) => {
      return {
        id: item.id,
        src: imageUploadUrl(item.image),
        title: item.caption,
        totalHeart: item.totalLikes,
        onGiveHeart(isAdd?: boolean) {
          if (!authContext.user) {
            router.push(`${configUseAuth.loginPage}?r=${router.asPath}`)
            return;
          }
          return apiInvitationGalleryLikesToggle(item.id)
        },
      }
    })
  }


  function TitleSectionInformation({ text, edit = null }) {
    const urlEdit = edit || `/dashboard/invite-card/${idCard}/edit/info`
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
            <TitleSectionInformation text={`💖 Cerita ${TextNameCouple(data.nameMale, data.nameFemale)}`} />
            <Text fontSize='xl' as='i'>
              {data.information}
            </Text>
          </Stack>
          <Stack>
            <TitleSectionInformation text='📷 Galeri' edit={urlPageInvitationGalleryEdit(idCard)} />
            <CardGalleryCuteList items={listGallery} />
          </Stack>
          <Stack>
            <TitleSectionInformation text='📅 Tanggal' />
            <Text fontSize='xl'>
              {DateOnlyLocale(data.date)}
            </Text>
          </Stack>
          <Stack>
            <TitleSectionInformation text='📍 Lokasi' />
            <Text fontSize='xl'>
              {data.location}
            </Text>
          </Stack>
          <Stack>
            <TitleSectionInformation text='⌛ Agenda Acara' />
            <Text fontSize='xl' style={{ whiteSpace: 'pre-wrap' }}>
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
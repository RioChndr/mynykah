import { Alert, AlertIcon, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { configUseAuth } from "../../lib/auth/config";
import { useAuth } from "../../lib/auth/useAuth";
import { imageUploadUrl } from "../../lib/file-helper/image-upload-url";
import { apiInvitationGalleryLikesToggle } from "../../lib/useFetch/api/invitation-gallery-api";
import { DataInvitationCard } from "../../lib/useFetch/api/invitationcard-api";
import { DateOnlyLocale, TextNameCouple } from "../../lib/utils/text-utils";
import { CardGalleryCuteList } from "./CardGallery";
import { InvitationContainer } from "./Container";
import { SummaryRsvp } from "./RSVPSummary";
import { TitleSectionInformation } from "./Section";

export interface PageInviationProps {
  data: DataInvitationCard
  isEditable?: boolean
  rsvp?: boolean
}

export function PageInvitationLayout(props: PageInviationProps) {
  const router = useRouter()
  const authContext = useAuth()
  const idCard = router.query.id as string

  const listGallery = useMemo(() => {
    if (!props?.data?.galleries) return []
    return props.data.galleries.map((item, i) => {
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
  }, [props.data])

  const listSection = useMemo(() => {
    const editInfo = `/dashboard/invite-card/${idCard}/edit/info`
    const editGallery = `/dashboard/invite-card/${idCard}/edit/gallery`
    let list: {
      title: string,
      condition: any,
      children: JSX.Element,
      whenEmpty?: JSX.Element,
      editUrl?: string
      isEditable?: boolean
    }[] = [
        {
          title: `💖 Cerita ${TextNameCouple(props.data.nameMale, props.data.nameFemale)}`,
          condition: props.data.information,
          children: (
            <Text fontSize='xl' as='i'>
              {props.data.information}
            </Text>
          )
        },
        {
          title: '📷 Galeri',
          condition: props.data.galleries?.length > 0,
          children: (
            <CardGalleryCuteList items={listGallery} />
          ),
          editUrl: editGallery,
          whenEmpty: (
            <Alert status='info' variant='left-accent'>
              <AlertIcon />
              <HStack spacing='3'>
                <Text>
                  Belum ada foto Galeri yang diunggah.
                </Text>
                <Link href={editGallery}>
                  <Button as='a' variant={'outline'} size='sm'>
                    Unggah Foto
                  </Button>
                </Link>
              </HStack>

            </Alert>
          )
        },
        {
          title: '📅 Tanggal',
          condition: props.data.date,
          children: (
            <Text fontSize='xl'>
              {DateOnlyLocale(props.data.date)}
            </Text>
          )
        },
        {
          title: '📍 Lokasi',
          condition: props.data.location,
          children: (
            <Text fontSize='xl'>
              {props.data.location}
            </Text>
          )
        },
        {
          title: '⌛ Agenda Acara',
          condition: props.data.agenda,
          children: (
            <Text fontSize='xl' style={{ whiteSpace: 'pre-wrap' }}>
              {props.data.agenda}
            </Text>
          )
        },

      ]

    if (props.isEditable) {
      list.forEach((v) => {
        v.editUrl = v.editUrl ?? editInfo
        v.isEditable = props.isEditable
      })
    }

    return list
  }, [props.data])

  return (
    <InvitationContainer data={props.data}>
      {(data: DataInvitationCard) => (
        <>
          {listSection.map((section, i) => {
            if (!section.condition && !section.isEditable) return <></>
            return (
              <Stack key={i}>
                <TitleSectionInformation
                  title={section.title}
                  editUrl={section.editUrl}
                  isEditable={section.isEditable}
                />
                {section.isEditable && !section.condition && section.whenEmpty}
                {section.children}
              </Stack>
            )
          })}
          <Stack>
            <SummaryRsvp idCard={data.id} isPreview={props.isEditable} />
            {props.rsvp && <Flex justifyContent='center' gap='3'>
              <Link href={`/invitation/${data.id}/not-join`} passHref >
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
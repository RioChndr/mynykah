import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { imageUploadUrl } from "../../lib/file-helper/image-upload-url";
import { useInvitationCardDetail } from "../../lib/useFetch/api/invitationcard-api";
import { TextNameCouple } from "../../lib/utils/text-utils";
import { ButtonBack } from "../common/ButtonBack";
import { InvitationCardThumbnail } from "./CardThumbnail";

export function InvitationContainer({ children: Children }) {
  const router = useRouter()
  const id = router.query.id as string
  const fetch = useInvitationCardDetail(id)
  if (fetch.isLoading) return (
    <Text>
      Loading ...
    </Text>
  )

  if (!fetch.data) return (
    <Text>
      Terjadi kesalahan
    </Text>
  )

  return (
    <Container marginBottom='12'>
      <Stack spacing='6'>
        <Box>
          <ButtonBack />
        </Box>
        <InvitationCardThumbnail
          image={imageUploadUrl(fetch.data.imageThumbnail)}
          title={TextNameCouple(fetch.data.nameMale, fetch.data.nameFemale)}
        />
        {Children(fetch.data)}
      </Stack>
    </Container>
  )
}
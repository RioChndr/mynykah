import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { imageUploadUrl } from "../../lib/file-helper/image-upload-url";
import { DataInvitationCard, useInvitationCardDetail } from "../../lib/useFetch/api/invitationcard-api";
import { TextNameCouple } from "../../lib/utils/text-utils";
import { ButtonBack } from "../common/ButtonBack";
import { InvitationCardThumbnail } from "./CardThumbnail";

export interface InvitationContainerProps {
  children: (props: any) => JSX.Element
  data: DataInvitationCard,
  isEditable?: boolean,
}

export function InvitationContainer({ children: Children, isEditable, data }: InvitationContainerProps) {
  return (
    <Container marginBottom='12'>
      <Stack spacing='6'>
        <Box>
          <ButtonBack />
        </Box>
        <InvitationCardThumbnail
          image={imageUploadUrl(data.imageThumbnail)}
          title={TextNameCouple(data.nameMale, data.nameFemale)}
          showEdit={isEditable}
        />
        {Children(data)}
      </Stack>
    </Container>
  )
}
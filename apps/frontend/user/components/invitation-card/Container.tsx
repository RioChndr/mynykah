import { Container, Stack } from "@chakra-ui/react";
import { imageUploadUrl } from "../../lib/file-helper/image-upload-url";
import { DataInvitationCard } from "../../lib/useFetch/api/invitationcard-api";
import { TextNameCouple } from "../../lib/utils/text-utils";
import { InvitationCardThumbnail } from "./CardThumbnail";

export interface InvitationContainerProps {
  children: (props: any) => JSX.Element
  data: DataInvitationCard,
}

export function InvitationContainer({ children: Children, data }: InvitationContainerProps) {
  return (
    <Container marginBottom='12'>
      <Stack spacing='6'>
        <InvitationCardThumbnail
          image={imageUploadUrl(data.imageThumbnail)}
          title={TextNameCouple(data.nameMale, data.nameFemale)}
        />
        {Children(data)}
      </Stack>
    </Container>
  )
}
import { Container, Stack } from "@chakra-ui/react";
import { InvitationCardThumbnail } from "./CardThumbnail";

export function InvitationContainer({ children }) {
  return (
    <Container marginBottom='12'>
      <Stack spacing='6'>
        <InvitationCardThumbnail
          image="https://picsum.photos/300/260"
          title="Rio Chandra dan Nabilla Mauludina mahmud"
        />
        {children}
      </Stack>
    </Container>
  )
}
import { Button, Flex, Grid, GridItem, Heading, Image, Stack } from "@chakra-ui/react";
import { ShadowBgImage } from "../../style/css-helper";

export interface CardThumbnailProps {
  title: string
  image: string
  info?: string
  showEdit?: boolean
}

export function InvitationCardThumbnail(props: CardThumbnailProps) {
  return (
    <Grid isolation='isolate'>
      <GridItem gridColumn='1 / -1' gridRow='1 / -1' padding='6' display='flex' justifyContent='end' flexDir='column'>
        <Flex justifyContent={'space-between'}>
          <Stack>
            <Heading size='lg' color='white'>
              {props.info ?? 'Pernikahan'}
            </Heading>
            <Heading size='xl' color='white'>
              {props.title}
            </Heading>
          </Stack>
          {props.showEdit && (
            <Button variant={'outline'}>
              Edit
            </Button>
          )}
        </Flex>
      </GridItem>
      <GridItem gridColumn='1 / -1' gridRow='1 / -1' zIndex='-1' position='relative' _before={{ ...ShadowBgImage, zIndex: '1' }}>
        <Image src={props.image ?? ''} width='full' maxH='40vh' minH='full' objectFit='cover' />
      </GridItem>
    </Grid>
  )
}
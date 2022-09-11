import { Grid, GridItem, Heading, Image } from "@chakra-ui/react";
import { ShadowBgImage } from "../../style/css-helper";

export interface CardThumbnailProps {
  title: string
  image: string
  info?: string
}

export function InvitationCardThumbnail(props: CardThumbnailProps) {
  return (
    <Grid isolation='isolate'>
      <GridItem gridColumn='1 / -1' gridRow='1 / -1' display='flex' justifyContent='end' padding='6' flexDir='column'>
        <Heading size='lg' color='white'>
          {props.info ?? 'Pernikahan'}
        </Heading>
        <Heading size='xl' color='white'>
          {props.title}
        </Heading>
      </GridItem>
      <GridItem gridColumn='1 / -1' gridRow='1 / -1' zIndex='-1' position='relative' _before={{ ...ShadowBgImage, zIndex: '1' }}>
        <Image src={props.image ?? ''} width='full' maxH='40vh' minH='full' objectFit='cover' />
      </GridItem>
    </Grid>
  )
}
import { Container } from "@chakra-ui/react";
import { CardGalleryCuteList, CardGalleryCuteProps } from "../components/invitation-card/CardGallery";

function TestPage() {
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
    <Container>
      <CardGalleryCuteList items={list} />
    </Container>
  )
}

export default TestPage
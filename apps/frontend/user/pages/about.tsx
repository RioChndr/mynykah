import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function About() {
  return (
    <Container>
      <Stack>
        <Heading>About</Heading>
        <Text>
          Mynykah is a website to create modern invitation card with modern feature like RSVP, Guest List, and many more.
        </Text>
        <Text as='i'>
          This website still on heavy Development. Please contact us (<a href="mailto:admin@mynykah.com">admin@mynykah.com</a>) if you have any question or suggestion.
        </Text>
        <Text>
          Created by <a href="https://github.com/RioChndr" target="_blank">Rio Chandra</a>
        </Text>
      </Stack>
    </Container>
  )
}
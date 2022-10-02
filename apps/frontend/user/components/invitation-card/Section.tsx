import { Button, Flex, Heading } from "@chakra-ui/react"
import Link from "next/link"

function TitleSection({ text, }) {
  return (
    <Heading size='md'>
      {text}
    </Heading>
  )
}

export function TitleSectionInformation({ title, editUrl = null, isEditable = false }) {
  return (
    <Flex justify='space-between'>
      <TitleSection text={title} />
      {isEditable && (
        <Link href={editUrl} passHref>
          <Button as='a' variant={'outline'} size='sm'>
            Edit
          </Button>
        </Link>
      )}
    </Flex>
  )
}
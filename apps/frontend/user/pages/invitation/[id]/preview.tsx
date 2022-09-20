import { Alert, AlertIcon, Button, Container, Flex, Text } from "@chakra-ui/react"
import { PageInvitationLayout } from "apps/frontend/user/components/invitation-card/PageInvitation"
import { apiInvitationCardSSRProps } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { GetServerSidePropsContext } from "next"
import Link from "next/link"
import { useRouter } from "next/router"

export function InviationIndexPagePreview(props: any) {
  const router = useRouter()
  const { id } = router.query
  const prodLink = `/invitation/${id}`
  return (
    <>
      <Container mb='3'>
        <Alert variant='top-accent' status='info'>
          <AlertIcon />
          <Flex justifyContent={'space-between'} alignItems='center' w='full'>
            <Text>
              Ini halaman preview, lihat hasil akhir disini
            </Text>
            <Link href={prodLink}>
              <Button as='a' size='sm' variant='outline' colorScheme="white" cursor='pointer'>
                Lihat
              </Button>
            </Link>
          </Flex>
        </Alert>
      </Container>
      <PageInvitationLayout
        isEditable={true}
        data={props.data}
      />
    </>
  )
}

/**
 * Redirect if not owner
 * @param context 
 * @returns 
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await apiInvitationCardSSRProps(context, {
    throwIfNotOwner: true,
  })
}

export default InviationIndexPagePreview
import { Box, Button, Container, Flex, Heading, Image, Input, Stack, Text, useToast } from "@chakra-ui/react"
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack"
import { InvitationCardTitle } from "apps/frontend/user/components/invitation-card/InvitationCardTitle"
import { InvitationHeaderPage } from "apps/frontend/user/components/invitation-card/InvitationHeaderPage"
import { imageUploadUrl } from "apps/frontend/user/lib/file-helper/image-upload-url"
import { apiInvitationCardDetail, apiInvitationCardSSRProps, apiInvitationCardUpdate, apiInvitationCardUpdateThumbnail } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { useRouter } from "next/router"
import { useState } from "react"
import { urlPageInvitationDetail } from "../detail"

export function InviteCardEditThumbnail({ data: DetailInvitation }) {
  const router = useRouter()
  const toast = useToast()
  const id = router.query.id as string
  const { data, isError: errorFetch, isLoading: loadingFetch } = apiInvitationCardDetail(id)

  const [selectedFile, setSelectedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function saveThumbnail() {
    if (!selectedFile) return;

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('imageThumbnail', selectedFile)
      await apiInvitationCardUpdateThumbnail(id, formData)
      toast({
        title: "Berhasil Ganti Thumbnail",
        status: 'success',
        duration: 5000,
        isClosable: true
      })
      router.reload()
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)

  }

  if (loadingFetch) return <Text>Loading ...</Text>
  if (errorFetch) {
    return <Text textColor='red'>Failed fetch data</Text>
  }

  return (
    <Container>
      <InvitationCardTitle data={DetailInvitation} suffix="Edit thumbnail"></InvitationCardTitle>
      <InvitationHeaderPage backTo={urlPageInvitationDetail(id)} data={DetailInvitation}></InvitationHeaderPage>
      <Stack mt='3'>
        <Heading size='md'>
          Edit Thumbnail Undangan
        </Heading>
        <Image src={data.imageThumbnail ? imageUploadUrl(data.imageThumbnail) : ''} width='full' maxH='40vh' minH='full' objectFit='contain' />

        <Stack>
          <Heading size='sm'>
            Ganti thumbnail
          </Heading>
          <Input
            type='file'
            multiple={false}
            onChange={(e) => {
              setSelectedFile(e.target.files[0])
            }}
          />
          <Box display='flex' justifyContent={'center'} w='full'>
            <Button onClick={() => saveThumbnail()} disabled={!selectedFile} isLoading={isLoading}>
              Simpan
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Container >
  )
}

export default InviteCardEditThumbnail

export async function getServerSideProps(context: any) {
  return await apiInvitationCardSSRProps(context, {
    throwIfNotOwner: true,
  })
}

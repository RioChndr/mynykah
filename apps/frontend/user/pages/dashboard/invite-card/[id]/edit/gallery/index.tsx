import { Box, Button, Container, Flex, Grid, GridItem, Heading, HStack, Image, Stack, Text, useToast } from "@chakra-ui/react"
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack"
import { InvitationCardTitle } from "apps/frontend/user/components/invitation-card/InvitationCardTitle"
import { InvitationHeaderPage } from "apps/frontend/user/components/invitation-card/InvitationHeaderPage"
import { imageUploadUrl } from "apps/frontend/user/lib/file-helper/image-upload-url"
import { apiInvitationGalleryDelete, apiInvitationGalleryList } from "apps/frontend/user/lib/useFetch/api/invitation-gallery-api"
import { apiInvitationCardSSRProps } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import Link from "next/link"
import { useRouter } from "next/router"
import { AiOutlineDelete, AiOutlineLike } from "react-icons/ai"
import { FiPlus } from "react-icons/fi"
import { urlPageInvitationDetail } from "../../detail"

export function InvitationCardEditGallery({ data }) {
  const router = useRouter()
  const id = router.query.id as string

  return (
    <Container>
      <Stack spacing='6'>
        <InvitationCardTitle data={data} suffix="List Galeri"></InvitationCardTitle>
        <InvitationHeaderPage backTo={urlPageInvitationDetail(id)} data={data}></InvitationHeaderPage>
        <Flex justifyContent='space-between' alignItems='center'>
          <Box>
            <Heading size='md'>
              Edit Galleri
            </Heading>
            <Text>
              Beritahu orang-orang kenangan anda
            </Text>

          </Box>
          <Link href={`/dashboard/invite-card/${id}/edit/gallery/add`} passHref>
            <Button as='a' leftIcon={<FiPlus />} variant='outline'>
              Tambah Galleri
            </Button>
          </Link>
        </Flex>
        <GalleryList />
      </Stack>
    </Container>
  )
}

export default InvitationCardEditGallery

function GalleryList() {
  const router = useRouter()
  const toast = useToast();
  const id = router.query.id as string
  const fetch = apiInvitationGalleryList(id)

  async function deleteGallery(index: number) {
    if (!window.confirm('Apakah anda yakin ingin menghapus ini ?')) return;
    const idGallery = fetch.data[index].id

    try {
      await apiInvitationGalleryDelete(idGallery)
      toast({
        title: "Berhasil menghapus gallery",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      router.reload()
    } catch (err) {
      console.log(err)
      toast({
        title: "Gagal menghapus data",
        description: "Silahkan coba lagi",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  if (fetch.isLoading) return <Text>Loading ...</Text>
  if (fetch.isError) {
    return <Text textColor='red'>Failed fetch data</Text>
  }

  return (
    <Grid templateColumns={'repeat(3, 1fr)'} gap='6'>
      {fetch.data.map((v, i) => {
        return (
          <GridItem key={i}>
            <Box maxW={{ sm: 'md', md: 'full' }} borderWidth='1px' borderRadius='lg' overflow='hidden'>
              <Image src={v.image ? imageUploadUrl(v.image) : ''}></Image>
              <Box p='6'>
                <Box mt='1'
                  fontWeight='semibold'
                  as='h4'
                  lineHeight='tight'
                  noOfLines={1}>
                  {v.caption}
                </Box>
                <Flex justifyContent={'space-between'}>
                  <HStack spacing='2' mt='2'>
                    <AiOutlineLike /> <Text color='gray.600' fontSize={'sm'}>{v.totalLikes} Likes</Text>
                  </HStack>
                  <Button size='sm' variant={'text'} onClick={() => deleteGallery(i)}>
                    <AiOutlineDelete color='red' size='18' />
                  </Button>
                </Flex>
              </Box>
            </Box>
          </GridItem>
        )
      })}
    </Grid>
  )
}

export function urlPageInvitationGalleryEdit(id: string) {
  return `/dashboard/invite-card/${id}/edit/gallery`
}


export async function getServerSideProps(context: any) {
  return await apiInvitationCardSSRProps(context, {
    throwIfNotOwner: true,
  })
}
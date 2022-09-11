import { Box, Button, Container, Flex, Grid, GridItem, Heading, Icon, Image, Text, useBreakpointValue } from "@chakra-ui/react"
import Link from "next/link"
import Router from "next/router"
import { FiPlus } from 'react-icons/fi'
import { ButtonOpenInvitationCard } from "../../components/invitation-card/ButtonOpen"
import { imageUploadUrl } from "../../lib/file-helper/image-upload-url"
import { useInvitationCardList } from "../../lib/useFetch/api/invitationcard-api"

/**
 * @todo Create : 
 * - link to detail
 * - bind
 */
function CardInvitation({
  image = 'https://picsum.photos/200',
  name = 'Rio Chandra dan billa',
  date = '2022-01-01',
  description = 'lorem ipsum',
  id = '1'
}) {
  return (
    <GridItem
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      w='100%'
      flexDir='column'
    >
      <Image src={imageUploadUrl(image)} width='full' height='300' objectFit='cover' />
      <Box p='6'>
        <Heading size='lg'>{name}</Heading>
        <Text size='xs'>
          {new Date(date).toLocaleString()}
        </Text>
        <Text my='3'>
          {description}
        </Text>
        <Flex justifyContent='space-between' mt='3'>
          <ButtonOpenInvitationCard id={id} size='sm' variant='outline' />
          <Button size='sm' onClick={() => Router.push(`/dashboard/invite-card/${id}/detail`)}>
            Lihat Detail
          </Button>
        </Flex>
      </Box>
    </GridItem>
  )
}

function CardCreateInvitation() {
  return (
    <Link href='/dashboard/invite-card/create'>
      <Box
        cursor='pointer'
        borderWidth='1px'
        borderRadius='lg'
        p={{ base: '6', md: '3' }}
        borderColor='primary'
        textAlign='center'
        color='primary'
        _hover={{
          background: 'primary',
          color: 'white',
        }}
      >
        <Text>
          Buat undangan baru
        </Text>
        <Icon as={FiPlus} w={4} h={4}></Icon>
      </Box>
    </Link>
  )
}

/**
 * @todo 
 * - bind api
 */
export function DashboardIndex() {
  const { data, isLoading, isError } = useInvitationCardList()
  let isDesktop = useBreakpointValue({ base: false, md: true })
  const templateColumnGrid = {
    base: '1fr',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)'
  }

  function ListCardInvitation() {
    if (isLoading) return <Text>Loading ...</Text>
    if (isError) return <Text textColor='red'>Terjadi kesalahan, {JSON.stringify(isError)}</Text>
    if (data) return data.map((v, index) => {
      return (
        <CardInvitation
          key={index}
          name={`${v.nameMale} dan ${v.nameFemale}`}
          date={v.date}
          image={v.imageThumbnail}
          id={v.id}
        />
      )
    })
  }

  return (
    <>
      <Container>
        <Flex justifyContent='space-between'>
          <Box>
            <Heading size="md">
              Undangan anda
            </Heading>
            <Text>
              List undangan anda
            </Text>
          </Box>
          <Box>
            {isDesktop && <CardCreateInvitation />}
          </Box>
        </Flex>
        <Grid mt='6' templateColumns={templateColumnGrid} gap='3'>
          {!isDesktop && <CardCreateInvitation />}
          {ListCardInvitation()}
        </Grid>
      </Container>
    </>
  )
}

export default DashboardIndex
import { Box, Button, Container, Flex, Grid, GridItem, Heading, Icon, Image, Stack, Text, useBreakpointValue, Wrap, WrapItem } from "@chakra-ui/react"
import Link from "next/link"
import Router from "next/router"
import { FiPlus } from 'react-icons/fi'

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
      <Image src={image} width='full' height='300' objectFit='cover'/>
      <Box p='6'>
        <Heading size='lg'>{name}</Heading>
        <Text size='xs'>
          {date}
        </Text>
        <Text my='3'>
          {description}
        </Text>
        <Flex justifyContent='space-between' mt='3'>
          <Button variant='outline' size='sm' onClick={() => Router.push(`/invite-card/${id}`)}>
            Buka undangan
          </Button>
          <Button size='sm' onClick={() => Router.push(`/dashboard/invite-card/${id}/detail`)}>
            Lihat Detail
          </Button>
        </Flex>
      </Box>
    </GridItem>
  )
}

function CardCreateInvitation(){
  return (
    <Link href='/dashboard/invite-card/create'>
      <Box
        cursor='pointer'
        borderWidth='1px'
        borderRadius='lg'
        p={{base: '6', md: '3'}}
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
export function DashboardIndex(){
  let isDesktop = useBreakpointValue({ base: false, md: true })
  const templateColumnGrid = {
    base: '1fr',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)'
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
          <CardInvitation />
          <CardInvitation />
          <CardInvitation />
          <CardInvitation />
          <CardInvitation />
        </Grid>
      </Container>
    </>
  )
}

export default DashboardIndex
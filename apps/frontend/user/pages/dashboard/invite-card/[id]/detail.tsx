import { Box, Button, Container, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Icon, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Switch, Text } from "@chakra-ui/react"
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack"
import { useRouter } from "next/router"
import { FiArrowUpRight } from "react-icons/fi";
import { BsQuestionCircle, BsPencilSquare } from "react-icons/bs";

export function InviteCardDetail(){
  const router = useRouter()
  const id = router.query.id

  return (
    <Container display='flex' flexDirection='column' gap='3'>
      <Flex justifyContent='space-between'>
        <ButtonBack></ButtonBack>
        <Button rightIcon={<FiArrowUpRight />}>
          Buka undangan
        </Button>
      </Flex>
      <Text fontSize='lg'>
        Undangan Rio chandra dan nabilla
      </Text>
      <Flex direction='column' gap='3'>
        <HeadingSection
          title="Statistik"
          description="Statistik membantu anda untuk melihat perkembangan undangan anda"
        />
        <Grid templateColumns={{base: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)'}} gap='6'>
          <GridItem>
            <CardStatistic name="Dibuka" number="28 Kali"/>
          </GridItem>
          <GridItem>
            <CardStatistic name="RSVP, Menghadiri" number="100 Orang  "/>
          </GridItem>
        </Grid>
      </Flex>
      <Flex direction='column' gap='3'>
        <HeadingSection title="Fitur undangan" description="Anda bisa pilih Fitur undangan sesuai keinginan anda"/>
        <Flex direction='column' gap='3' width={{base:'full', md:'50%'}}>
          <FeatureControl name="Fitur Halaman Undangan"/>
          <FeatureControl name="RSVP"/>
          <FeatureControl name="Our Story"/>
          <FeatureControl name="Keluarga"/>
        </Flex>
      </Flex>
    </Container>
  )
}

export default InviteCardDetail

function HeadingSection ({title, description}){
  return (
    <Box>
      <Heading size='lg'>
        {title}
      </Heading>
      <Text>
        {description}
      </Text>
    </Box>
  )
}

function CardStatistic ({name, number}){
  return (
    <Stat border='1px' borderColor='gray' borderRadius='lg' p={{base: '3', md: '6'}}>
      <StatLabel>
        {name}
      </StatLabel>
      <StatNumber>
        {number}
      </StatNumber>
      <StatHelpText>
        <StatArrow type='increase' />
        23.36%
      </StatHelpText>
    </Stat>
  )
}

function FeatureControl({name}){
  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <FormControl display='flex' alignItems='center' gap='3'>
        <Switch></Switch>
        <FormLabel mb='0'>
          {name}
        </FormLabel>
        <Icon as={BsQuestionCircle} ml='3' mb='0'/>
      </FormControl>
      <Icon as={BsPencilSquare} color='gray' cursor='pointer'/>
    </Flex>
  )
}
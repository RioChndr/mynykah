import { Box, Button, Container, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Highlight, Icon, position, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Switch, Text } from "@chakra-ui/react"
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack"
import { useRouter } from "next/router"
import { AiOutlineWarning } from "react-icons/ai";
import { BsQuestionCircle, BsPencilSquare } from "react-icons/bs";
import { HeadingSection } from "apps/frontend/user/components/common/HeadingSection";
import { InvitationHeaderPage } from "apps/frontend/user/components/invitation-card/InvitationHeaderPage";
import Link from "next/link";

export function InviteCardDetail() {
  const router = useRouter()
  const id = router.query.id

  const pageInviteCard = {
    editInfo: `/dashboard/invite-card/${id}/edit/info`,
    editRsvp: `/dashboard/invite-card/${id}/edit/rsvp`,
  }

  return (
    <Container display='flex' flexDirection='column' gap='3'>
      <InvitationHeaderPage name={'Undangan Rio chandra dan nabilla'} />
      <Flex direction='column' gap='3'>
        <HeadingSection
          title="Statistik"
          description="Statistik membantu anda untuk melihat perkembangan undangan anda"
        />
        <Grid templateColumns={{ base: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap='6'>
          <GridItem>
            <CardStatistic name="Dibuka" number="28 Kali" />
          </GridItem>
          <GridItem>
            <CardStatistic name="RSVP, Menghadiri" number="100 Orang" />
          </GridItem>
        </Grid>
      </Flex>
      <Flex direction='column' gap='3'>
        <HeadingSection title="Fitur undangan" description="Anda bisa pilih Fitur undangan sesuai keinginan anda" />
        <Flex direction='column' gap='3' width={{ base: 'full', md: '50%' }}>
          <FeatureControl name="Fitur Halaman Undangan" editPage={pageInviteCard.editInfo} />
          <FeatureControl name="RSVP" editPage={pageInviteCard.editRsvp} />
          <FeatureControl name="Our Story" comingSoon />
          <FeatureControl name="Keluarga" comingSoon />
        </Flex>
      </Flex>
    </Container>
  )
}

export default InviteCardDetail

function CardStatistic({ name, number, isComingSoon = true }) {
  return (
    <Stat
      border='1px' borderColor='gray' borderRadius='lg' position='relative' overflow='hidden'
      color={isComingSoon ? 'gray' : ''}
    >
      <Box p={{ base: '3', md: '6' }} >
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
      </Box>
      {
        isComingSoon &&
        <Flex
          width='100%' height='100%' position='absolute' top='0' left='0'
          justifyContent="center" alignItems="center"
          _before={{
            opacity: 0.8,
            bg: 'gray.400',
            content: `""`,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: '-1'
          }}
        >
          <ComingSoon />
        </Flex>
      }
    </Stat>
  )
}

const ComingSoon = () => {
  return (
    <Box as='span'
      background="orange.300"
      px='2' py='1'
      ml='3'
      rounded='full'
      color='white'
      fontSize='xs'
    >
      Coming Soon <Icon as={AiOutlineWarning}></Icon>
    </Box>
  )
}

function FeatureControl(props: { name: string, editPage?: string, comingSoon?: boolean }) {
  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <FormControl display='flex' alignItems='center' gap='3'>
        <Switch disabled={props.comingSoon}></Switch>
        <FormLabel mb='0'>
          {props.name}
          {props.comingSoon && <ComingSoon />}
        </FormLabel>
        <Icon as={BsQuestionCircle} ml='3' mb='0' />
      </FormControl>
      <Link href={props.editPage || ""}>
        <Icon as={BsPencilSquare} color='gray' cursor='pointer' />
      </Link>
    </Flex>
  )
}
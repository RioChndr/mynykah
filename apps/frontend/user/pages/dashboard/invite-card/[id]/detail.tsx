import { Box, Container, Flex, Grid, GridItem, Icon, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { CardStatistic } from "apps/frontend/user/components/common/CardStatistic";
import { HeadingSection } from "apps/frontend/user/components/common/HeadingSection";
import { InvitationHeaderPage } from "apps/frontend/user/components/invitation-card/InvitationHeaderPage";
import { apiRsvpTotal } from "apps/frontend/user/lib/useFetch/api/invitation-rsvp-api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { BsFillGiftFill, BsFillPersonCheckFill, BsPencilSquare } from "react-icons/bs";

export function InviteCardDetail() {
  const router = useRouter()
  const id = router.query.id

  const pageInviteCard = {
    editInfo: `/dashboard/invite-card/${id}/edit/info`,
    editRsvp: `/dashboard/invite-card/${id}/edit/rsvp`,
  }

  return (
    <Container display='flex' flexDirection='column' gap='3'>
      <InvitationHeaderPage />
      <SectionStatistic />
      <Flex direction='column' gap='3'>
        <HeadingSection title="Fitur undangan" description="Anda bisa pilih Fitur undangan sesuai keinginan anda" />
        <Flex direction='column' gap='3' width={{ base: 'full', md: '50%' }}>
          <FeatureControl name="Fitur Halaman Undangan" editPage={pageInviteCard.editInfo} />
          <FeatureControl name="RSVP" editPage={pageInviteCard.editRsvp} />
        </Flex>
      </Flex>
    </Container>
  )
}

export default InviteCardDetail

function SectionStatistic() {
  const router = useRouter()
  const id = router.query.id as string
  const fetchTotal = apiRsvpTotal(id)

  const totalGuest = useMemo(() => {
    if (fetchTotal.isLoading) return "..."
    if (fetchTotal.isError) return "0"
    const attendedData = fetchTotal.data.find((v) => v.status === "attended")
    return attendedData?._sum.person + " Orang"
  }, [fetchTotal.data])

  const totalGift = useMemo(() => {
    if (fetchTotal.isLoading) return "..."
    if (fetchTotal.isError) return "0"
    let total = 0
    fetchTotal.data.forEach((v) => {
      total += v._sum.gift
    })
    return total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
  }, [fetchTotal.data])

  return (<Flex direction='column' gap='3'>
    <HeadingSection
      title="Statistik"
      description="Statistik membantu anda untuk melihat perkembangan undangan anda"
    />
    <Grid templateColumns={{ base: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap='6'>
      <GridItem>
        <CardStatistic name="Jumlah tamu" number={totalGuest} icon={<BsFillPersonCheckFill size='24' />} />
      </GridItem>
      <GridItem>
        <CardStatistic name="Jumlah Gift" number={totalGift} icon={<BsFillGiftFill size="20" />} />
      </GridItem>
    </Grid>
  </Flex>)
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
      <div>
        {props.name}
        {props.comingSoon && <ComingSoon />}
      </div>
      <Link href={props.editPage || ""}>
        <Icon as={BsPencilSquare} color='gray' cursor='pointer' />
      </Link>
    </Flex>
  )
}
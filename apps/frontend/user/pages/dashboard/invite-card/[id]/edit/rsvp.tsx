import { Checkbox, Container, Flex, Grid, GridItem, HStack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { CardStatistic } from "apps/frontend/user/components/common/CardStatistic"
import { HeadingSection } from "apps/frontend/user/components/common/HeadingSection"
import { PaginationControl, usePaginationControl } from "apps/frontend/user/components/common/PaginationControl"
import { InvitationCardTitle } from "apps/frontend/user/components/invitation-card/InvitationCardTitle"
import { InvitationHeaderPage } from "apps/frontend/user/components/invitation-card/InvitationHeaderPage"
import { apiRsvpList, apiRsvpTotal } from "apps/frontend/user/lib/useFetch/api/invitation-rsvp-api"
import { apiInvitationCardSSRProps } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { CurrencyID, DateOnlyLocale } from "apps/frontend/user/lib/utils/text-utils"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { BsFillGiftFill, BsFillPersonCheckFill, BsFillPersonXFill } from "react-icons/bs"
import { urlPageInvitationDetail } from "../detail"

export function InvitationCardEditRsvp({ data }) {
  const router = useRouter()
  const id = router.query.id as string

  return (
    <Container display='flex' gap='6' flexDirection='column' mb='12'>
      <InvitationCardTitle data={data} suffix="RSVP"></InvitationCardTitle>
      <InvitationHeaderPage backTo={urlPageInvitationDetail(id)} data={data} />
      <HeadingSection
        title="RSVP"
        description="RSVP dicantumkan untuk memberitahu tamu bahwa mereka perlu melakukan konfirmasi sebelum menghadiri acaranya"
      />
      <StatisticRSVP />
      <Flex direction='column' gap='3'>
        <HeadingSection
          title="Orang yang menghadiri undangan"
          description="RSVP dicantumkan untuk memberitahu tamu bahwa mereka perlu melakukan konfirmasi sebelum menghadiri acaranya"
        >
        </HeadingSection>
        <TableGuest />
      </Flex>
    </Container>
  )
}

export default InvitationCardEditRsvp

export async function getServerSideProps(context: any) {
  return await apiInvitationCardSSRProps(context, {
    throwIfNotOwner: true,
  })
}

function StatisticRSVP() {
  const router = useRouter()
  const id = router.query.id as string
  const fetchTotal = apiRsvpTotal(id)

  const totalGuest = useMemo(() => {
    if (fetchTotal.isLoading) return "..."
    if (fetchTotal.isError) return "0"
    const attendedData = fetchTotal.data.find((v) => v.status === "attended")
    if (!attendedData?._sum.person) {
      return "0 Orang"
    }
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

  const totalNotAttended = useMemo(() => {
    if (fetchTotal.isLoading) return "..."
    if (fetchTotal.isError) return "0"
    const attendedData = fetchTotal.data.find((v) => v.status === "notAttended")
    if (!attendedData?._count.status) {
      return "0 Orang"
    }
    return attendedData?._count.status + " Orang"
  }, [fetchTotal.data])

  return (
    <Grid templateColumns={{ base: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap='6'>
      <GridItem>
        <CardStatistic
          name="Jumlah tamu"
          number={totalGuest}
          icon={<BsFillPersonCheckFill size='24' />}
        />
      </GridItem>
      <GridItem>
        <CardStatistic
          name="Jumlah Gift"
          number={totalGift}
          icon={<BsFillGiftFill size="20" />}
        />
      </GridItem>
      <GridItem>
        <CardStatistic
          name="Jumlah Tidak hadir"
          number={totalNotAttended}
          icon={<BsFillPersonXFill size="24" />}
        />
      </GridItem>
    </Grid>
  )
}

function TableGuest() {
  const router = useRouter()
  const id = router.query.id as string
  const paginate = usePaginationControl()
  const [selectAll, setSelectAll] = useState(false)

  const fetchList = apiRsvpList(id, {
    limit: paginate.limit,
    page: paginate.page,
    ...!selectAll && {
      status: "attended"
    }
  })

  const listStatus = new Map()
  listStatus.set("attended", "Hadir")
  listStatus.set("notAttended", "Tidak Hadir")

  return (
    <TableContainer>
      <HStack m='3'>
        <Checkbox isChecked={selectAll} onChange={(e) => setSelectAll(!selectAll)}>Tampilkan semua</Checkbox>
      </HStack>
      <Table variant='simple'>
        <TableCaption>Total {fetchList.data?.total || 0} Orang Konfirmasi</TableCaption>
        <Thead bg='primary'>
          <Tr>
            {
              [
                "Nama",
                "Status",
                "Tamu",
                "Gift",
                "Tanggal Konfirmasi",
              ].map((v, i) => (
                <Th key={i} textColor='white'>{v}</Th>
              ))
            }
          </Tr>
        </Thead>
        {fetchList.isLoading && <Tbody>
          <Tr>
            <Td colSpan={2}>
              Loading...
            </Td>
          </Tr>

        </Tbody>}
        {fetchList.data && <Tbody>
          {fetchList.data.data.map((v) => (
            <Tr key={v.id}>
              <Td>
                {v.name}
              </Td>
              <Td>
                {listStatus.get(v.status)}
              </Td>
              <Td>
                {v.person ? v.person + " Orang" : "-"}
              </Td>
              <Td>
                {CurrencyID(v.gift, '-')}
              </Td>
              <Td>
                {DateOnlyLocale(v.createdAt)}
              </Td>
            </Tr>
          ))}
        </Tbody>}
      </Table>
      <PaginationControl
        total={fetchList.data && paginate.calculateTotalPage(fetchList.data?.total, fetchList.data.limit)}
        page={paginate.page}
        onChange={paginate.changePage}
      ></PaginationControl>
    </TableContainer>
  )
}

export function urlPageInvitationRsvp(id: string) {
  return `/dashboard/invite-card/${id}/edit/rsvp`
}
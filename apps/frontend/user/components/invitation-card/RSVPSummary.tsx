import { Heading, Text, Link as LinkHref } from "@chakra-ui/react"
import Link from "next/link"
import { useMemo } from "react"
import { apiRsvpTotal } from "../../lib/useFetch/api/invitation-rsvp-api"

export function SummaryRsvp({ idCard, isPreview }) {
  const { data, isLoading, isError } = apiRsvpTotal(idCard)

  const urlRsvp = `/dashboard/invite-card/${idCard}/edit/rsvp`

  const totalGuest = useMemo(() => {
    if (isLoading) return "..."
    if (isError) return "0"
    const attendedData = data.find((v) => v.status === "attended")
    return attendedData?._sum.person + " Orang"
  }, [data])

  if (isLoading) {
    return <Text>...</Text>
  }
  if (!data || isError) {
    return <Text>"Failed fetch rsvp"</Text>
  }

  return (
    <Heading fontSize='md' textAlign='center'>
      {totalGuest} Orang lain menghadiri undangan ini. &nbsp;
      {isPreview && <Link href={urlRsvp}>
        <LinkHref as='a'>
          Lihat detail disini
        </LinkHref>
      </Link>}
    </Heading>
  )
}
import { Alert, AlertIcon, AlertTitle, Box, Container } from "@chakra-ui/react"
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack"
import { QuickAlert } from "apps/frontend/user/components/common/QuickAlert"
import { InvitationForm } from "apps/frontend/user/components/invitation-card/InvitationForm"
import { apiInvitationCardCreate, DataInvitationCardCreate } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import Router from "next/router"
import { useState } from "react"

export function InviteCardCreate() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  const MessageForm = () => {
    if (!isError) return null
    return <QuickAlert status='error'>Gagal menyimpan data. mohon coba lagi</QuickAlert>
  }

  const onSubmit = async (values: DataInvitationCardCreate) => {
    setIsLoading(true)
    try {
      console.log(values)
      const data = new FormData()
      Object.keys(values).forEach((v) => {
        data.append(v, values[v])
      })
      const res = await apiInvitationCardCreate(data)
      console.log(res)
      Router.push('/dashboard')
    } catch (err) {
      console.log(err)
      setIsError(err)
    }
    setIsLoading(false)
  }

  return (
    <Container display='flex' flexDir='column' gap="6">
      <Box>
        <ButtonBack></ButtonBack>
      </Box>
      <MessageForm />
      <InvitationForm loading={isLoading} onSubmit={onSubmit} />
    </Container>
  )
}

export default InviteCardCreate
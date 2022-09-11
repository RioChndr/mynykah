import { Box, Button, Center, Container, Flex, Heading, Text } from "@chakra-ui/react"
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack"
import { QuickAlert } from "apps/frontend/user/components/common/QuickAlert"
import { FieldForm } from "apps/frontend/user/components/form/field"
import { apiInvitationCardDetail, apiInvitationCardUpdate } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { Form, Formik } from "formik"
import Router, { useRouter } from "next/router"
import { useState } from "react"

export function InviteCardEditInfo() {
  const router = useRouter()
  const id = router.query.id

  return (
    <Container display='flex' flexDir='column' gap="6">
      <Box>
        <ButtonBack></ButtonBack>
      </Box>

      <SectionEdit id={id} />
    </Container>
  )
}

function SectionEdit({ id }) {
  const { data, isError, isLoading } = apiInvitationCardDetail(id)

  const initialValues = data || {
    nameMale: '',
    nameFemale: '',
    date: '',
    location: '',
    locationCoord: '',
  }


  const [onSaving, setOnSaving] = useState(false)
  const [onSavingError, setOnSavingError] = useState(null)

  const onSubmit = async (values) => {
    setOnSaving(true)
    try {
      await apiInvitationCardUpdate(id, values)
      Router.replace('/dashboard/invite-card/' + id + "/detail")
    } catch (err) {
      setOnSavingError(true)
    }
    setOnSaving(false)
  }

  if (isLoading) return <Text>Loading ...</Text>
  if (isError) {
    return <Text textColor='red'>Failed fetch data</Text>
  }
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} enableReinitialize>
      <Form>
        <Flex direction='column' gap='3'>
          <Heading size='md'>
            Edit undangan
          </Heading>
          <Text>
            Kabarkan dimana dan kapan acara ini dimulai
          </Text>
          <FieldForm name="nameMale" label="Nama pasangan Laki-laki" isRequired />
          <FieldForm name="nameFemale" label="Nama pasangan Perempuan" isRequired />
          <FieldForm name="date" label="Tanggal menikah" type='date' isRequired />
          <FieldForm name="location" label="Lokasi" isRequired />
        </Flex>
        <Center mt='3'>
          {onSavingError && <QuickAlert status='error'>Gagal menyimpan data</QuickAlert>}
          <Button type='submit' isLoading={onSaving}>
            Simpan
          </Button>
        </Center>
      </Form>
    </Formik>
  )
}

export default InviteCardEditInfo
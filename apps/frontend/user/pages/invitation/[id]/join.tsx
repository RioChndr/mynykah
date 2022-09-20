import { Button, Center, Flex, Heading, Input, Stack } from "@chakra-ui/react"
import { ButtonInviationLink } from "apps/frontend/user/components/invitation-card/HelperComponent"
import { apiInvitationCardSSRProps } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { GetServerSidePropsContext } from "next"
import { useEffect, useState } from "react"
import { BiMinus, BiPlus } from 'react-icons/bi'
import { Formik } from "formik"
import { InvitationContainer } from "../../../components/invitation-card/Container"
import { InvitationFormGift } from "../../../components/invitation-card/FormGift"
import { api } from "apps/frontend/user/lib/useFetch/api"
import { apiRsvpJoin } from "apps/frontend/user/lib/useFetch/api/invitation-rsvp-api"
import { useRouter } from "next/router"

interface FormInterface {
  name: string,
  person: number,
  gift?: number
}

export function InvitationJoin(props: any) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const initialValue: FormInterface = {
    name: '',
    person: 1,
    gift: 50000,
  }

  async function onSubmit(val: FormInterface) {
    setIsLoading(true)
    try {
      await apiRsvpJoin({
        cardId: props.data.id,
        name: val.name,
        totalPerson: val.person,
        gift: val.gift,
      })
      router.push(`/invitation/${props.data.id}`)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  return (
    <InvitationContainer data={props.data}>
      {(props) => (
        <Formik onSubmit={onSubmit} initialValues={initialValue}>
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Flex w='full' justifyContent='center'>
                <Stack w={{ sm: 'full', md: '50%' }} spacing='6'>
                  <Stack>
                    <Heading size='lg' textAlign='center'>
                      RSVP Hadir
                    </Heading>
                    <Input name="name" placeholder="Nama" value={values.name} onChange={handleChange} />
                  </Stack>
                  <Stack>
                    <Heading size='md' textAlign='center'>
                      Jumlah Tamu
                    </Heading>
                    <FormCounter value={values.person} onChange={(val: any) => setFieldValue('person', val)} />
                  </Stack>
                  <Stack>
                    <Heading size='md' textAlign='center'>
                      Gift / Hadiah
                    </Heading>
                    <InvitationFormGift value={values.gift} onChange={(val: any) => setFieldValue('gift', val)} />
                  </Stack>
                  <Stack>
                    <Button type='submit' isLoading={isLoading}>
                      Saya akan Hadir
                    </Button>
                    <Center>
                      <ButtonInviationLink id={props.id} />
                    </Center>
                  </Stack>
                </Stack>
              </Flex>
            </form>
          )}
        </Formik>
      )}
    </InvitationContainer>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await apiInvitationCardSSRProps(context)
}

export default InvitationJoin

function FormCounter({ value, onChange }) {
  useEffect(() => {
    if (value < 1) {
      return onChange(1)
    }
  }, [value])

  return (
    <Stack direction={'row'}>
      <Button variant={'outline'} colorScheme='gray' onClick={() => onChange(value - 1)}>
        <BiMinus />
      </Button>
      <Input placeholder="Jumlah Tamu" type='number' value={value} onChange={(e) => onChange(+e.target.value)} />
      <Button variant={'outline'} colorScheme='gray' onClick={() => onChange(value + 1)}>
        <BiPlus />
      </Button>
    </Stack>
  )
}
import { Button, Center, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Stack, useToast } from "@chakra-ui/react"
import { ButtonInviationLink } from "apps/frontend/user/components/invitation-card/HelperComponent"
import { InvitationCardTitle } from "apps/frontend/user/components/invitation-card/InvitationCardTitle"
import { apiRsvpJoin } from "apps/frontend/user/lib/useFetch/api/invitation-rsvp-api"
import { apiInvitationCardSSRProps } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { Formik } from "formik"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { BiMinus, BiPlus } from 'react-icons/bi'
import { InvitationContainer } from "../../../components/invitation-card/Container"
import { InvitationFormGift } from "../../../components/invitation-card/FormGift"
import * as yup from 'yup'

interface FormInterface {
  name: string,
  person: number,
  gift?: number
}

export function InvitationJoin(props: any) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required('Nama harus diisi'),
      person: yup.number().required('Jumlah tamu harus diisi').min(1, 'Jumlah tamu minimal 1'),
    })
  }, [])

  const initialValue: FormInterface = {
    name: '',
    person: 1,
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
      toast({
        title: 'Berhasil simpan RSVP',
        status: 'success',
        description: 'Terima kasih telah mengisi undangan',
        duration: 3000,
        onCloseComplete: () => {
          router.push(`/invitation/${props.data.id}`)
        }
      })
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  return (
    <>
      <InvitationCardTitle data={props.data}></InvitationCardTitle>
      <InvitationContainer data={props.data}>
        {(props) => (
          <Formik onSubmit={onSubmit} initialValues={initialValue} validationSchema={validationSchema}>
            {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <Flex w='full' justifyContent='center'>
                  <Stack w={{ sm: 'full', md: '50%' }} spacing='6'>
                    <Stack>
                      <Heading size='lg' textAlign='center'>
                        RSVP Hadir
                      </Heading>
                      <FormControl isInvalid={errors.name && touched.name}>
                        <FormLabel>
                          Nama
                        </FormLabel>
                        <Input name="name" placeholder="Nama" value={values.name} onChange={handleChange} />
                        <FormErrorMessage>
                          {errors.name}
                        </FormErrorMessage>
                      </FormControl>
                    </Stack>
                    <Stack>
                      <Heading size='md' textAlign='center'>
                        Jumlah Tamu
                      </Heading>
                      <FormControl isInvalid={errors.person && touched.person}>
                        <FormCounter value={values.person} onChange={(val: any) => setFieldValue('person', val)} />
                        <FormErrorMessage>
                          {errors.person}
                        </FormErrorMessage>
                      </FormControl>
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
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await apiInvitationCardSSRProps(context)
}

export default InvitationJoin

function FormCounter({ value, onChange }) {
  useEffect(() => {
    if (value < 1) {
      onChange(1)
      return;
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
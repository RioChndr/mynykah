import { Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react"
import { ButtonInviationLink } from "apps/frontend/user/components/invitation-card/HelperComponent"
import { InvitationCardTitle } from "apps/frontend/user/components/invitation-card/InvitationCardTitle"
import { apiRsvpNotJoin } from "apps/frontend/user/lib/useFetch/api/invitation-rsvp-api"
import { apiInvitationCardSSRProps } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { Formik, FormikProps } from "formik"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { InvitationContainer } from "../../../components/invitation-card/Container"
import { InvitationFormGift } from "../../../components/invitation-card/FormGift"
import * as yup from 'yup'

interface FormInterface {
  name: string,
  reason: string,
  gift?: number
}

export function InvitationNotJoin(props: any) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required('Nama harus diisi'),
    })
  }, [])

  const reasons = [
    'Saya sibuk',
    'Saya sakit',
    'Terlalu jauh',
    'Lainnya'
  ]

  const initVal: FormInterface = {
    name: '',
    reason: reasons[0],
  }


  async function onSubmit(val) {
    setIsLoading(true)
    try {
      await apiRsvpNotJoin({
        cardId: props.data.id,
        name: val.name,
        reason: val.reason,
        gift: val.gift,
      })
      toast({
        title: 'Berhasil simpan RSVP',
        status: 'success',
        description: 'Terima kasih telah konfirmasi undangan',
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
          <Formik onSubmit={onSubmit} initialValues={initVal} validationSchema={validationSchema}>
            {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }: FormikProps<FormInterface>) => (
              <form onSubmit={handleSubmit}>
                <Flex w='full' justifyContent='center'>
                  <Stack w={{ sm: 'full', md: '50%' }} spacing='6'>
                    <Heading size='lg' textAlign='center'>
                      RSVP Tidak Hadir
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
                    <RadioGroup value={values.reason} onChange={(val) => setFieldValue('reason', val)}>
                      <Stack>
                        <Heading size='md'>
                          Alasan
                        </Heading>
                        {reasons.map((v) => (
                          <Radio value={v}>{v}</Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                    <Stack>
                      <Heading size='lg' textAlign='center'>
                        Gift / Hadiah
                      </Heading>
                      <InvitationFormGift value={values.gift} onChange={(val: any) => setFieldValue('gift', val)} />
                    </Stack>
                    <Stack>
                      <Button type='submit' colorScheme="gray" isLoading={isLoading}>
                        Saya tidak Hadir
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

export default InvitationNotJoin
import { Button, Center, Flex, Heading, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { ButtonInviationLink } from "apps/frontend/user/components/invitation-card/HelperComponent"
import { apiRsvpNotJoin } from "apps/frontend/user/lib/useFetch/api/invitation-rsvp-api"
import { apiInvitationCardSSRProps } from "apps/frontend/user/lib/useFetch/api/invitationcard-api"
import { Formik } from "formik"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { InvitationContainer } from "../../../components/invitation-card/Container"
import { InvitationFormGift } from "../../../components/invitation-card/FormGift"

interface FormInterface {
  name: string,
  reason: string,
  gift?: number
}

export function InvitationNotJoin(props: any) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const reasons = [
    'Saya sibuk',
    'Anak saya kabur',
    'Mager',
    'Lainnya'
  ]

  const initVal: FormInterface = {
    name: '',
    reason: reasons[0],
    gift: 50000,
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
      router.push(`/invitation/${props.data.id}`)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  return (
    <InvitationContainer data={props.data}>
      {(props) => (
        <Formik initialValues={initVal} onSubmit={onSubmit}>
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Flex w='full' justifyContent='center'>
                <Stack w={{ sm: 'full', md: '50%' }} spacing='6'>
                  <Heading size='lg' textAlign='center'>
                    RSVP Tidak Hadir
                  </Heading>
                  <Input placeholder="Nama" name='name' value={values.name} onChange={handleChange} />
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
  )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await apiInvitationCardSSRProps(context)
}

export default InvitationNotJoin
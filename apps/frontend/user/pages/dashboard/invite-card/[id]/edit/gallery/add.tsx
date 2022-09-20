import { Box, Button, Container, Flex, Heading, HStack, Stack, useToast } from "@chakra-ui/react";
import { ButtonBack } from "apps/frontend/user/components/common/ButtonBack";
import { Form, Formik } from "formik";
import { FieldForm } from "apps/frontend/user/components/form/field";
import { useRouter } from "next/router";
import { useState } from "react";
import { apiInvitationGalleryCreate } from "apps/frontend/user/lib/useFetch/api/invitation-gallery-api";

export default function InvitationCardEditGalleryAdd() {
  const router = useRouter();
  const id = router.query.id as string;
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(val: {
    caption: string,
    image: string,
    cardId?: string
  }) {
    val.cardId = id
    const data = new FormData()
    Object.keys(val).forEach((v) => {
      data.append(v, val[v])
    })

    setIsLoading(true)
    try {
      await apiInvitationGalleryCreate(data)
      toast({
        title: "Berhasil menambahkan gallery",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      router.push(`/dashboard/invite-card/${id}/edit/gallery`)
    } catch (err) {
      console.log(err)
      toast({
        title: "Gagal menambahkan data",
        description: "Silahkan coba lagi",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  return (
    <Container>
      <Stack spacing={3}>
        <Box>
          <ButtonBack></ButtonBack>
        </Box>
        <Heading size="lg">
          Tambah Galleri
        </Heading>
        <Formik initialValues={{
          caption: '',
          image: ''
        }} onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form>
                <Stack>
                  <FieldForm name="caption" label="Caption" />
                  <FieldForm name="image" label="Gambar" type="file" />
                  <Box>
                    <Button type='submit' isLoading={isLoading}>
                      Simpan
                    </Button>
                  </Box>
                </Stack>
              </Form>
            )
          }}
        </Formik>
      </Stack>
    </Container>
  )
}
import { Button, Center, Flex, FormControl, FormLabel, Heading, Text, Textarea } from "@chakra-ui/react";
import { Form, Formik, useField, useFormikContext } from 'formik';
import { useEffect, useState } from "react";
import { DataInvitationCardCreate } from "../../lib/useFetch/api/invitationcard-api";
import { FieldForm } from "../form/field";

export interface InvitationFormProps {
  title?: string
  onSubmit?: (value: DataInvitationCardCreate) => any
  data?: DataInvitationCardCreate | any,
  loading?: boolean
  hideFile?: boolean
}

export function InvitationForm(props: InvitationFormProps) {
  const initialValues = props.data || {
    nameMale: '',
    nameFemale: '',
    date: '',
    location: '',
    locationCoord: '',
    imageThumbnail: ''
  }

  const formOptions = {
    onSubmit: (value) => {
      props.onSubmit(value)
    },
  }

  return (
    <Formik onSubmit={formOptions.onSubmit} initialValues={initialValues} enableReinitialize>
      {(formik) => (
        <Form>
          <Flex direction='column' gap='3'>
            <Heading size='md'>
              {props.title ?? 'Form buat undangan baru'}
            </Heading>
            <Text>
              Kabarkan dimana dan kapan acara ini dimulai
            </Text>
            <FieldForm name="nameMale" label="Nama pasangan Laki-laki" isRequired />
            <FieldForm name="nameFemale" label="Nama pasangan Perempuan" isRequired />
            <FieldForm name="date" label="Tanggal menikah" type='date' isRequired />
            <FieldForm name="location" label="Lokasi" isRequired />
            <FormControl>
              <FormLabel htmlFor="information">
                Cerita tentang Anda dan pasangan anda
              </FormLabel>
              <Textarea
                name="information"
                placeholder={'Ceritakan tentang Anda dan pasangan Anda'}
                value={formik.values.information}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="agenda">
                Agenda Acara
              </FormLabel>
              <Textarea
                name="agenda"
                placeholder={'Akad nikah. Senin 18.00\nNikah. Selasa 19.00-selesai'}
                value={formik.values.agenda}
                onChange={formik.handleChange}
              />
            </FormControl>
          </Flex>

          {!props.hideFile && <Flex direction='column' gap='3'>
            <Heading size='md'>
              Foto undangan
            </Heading>
            <Text>
              Abadikan kenangan anda dan beri tahu semua orang
            </Text>
            <FieldForm
              name="imageThumbnail"
              label="Foto thumbnail besar"
              type='file'
              propsInput={{ accept: "image/*" }}
            />
          </Flex>}
          <Center mt='3'>
            <Button type='submit' isLoading={props.loading}>
              Simpan
            </Button>
          </Center>
        </Form>

      )}
    </Formik>
  )
}
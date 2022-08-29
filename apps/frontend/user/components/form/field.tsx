import { FormControl, FormLabel, Input, FormControlProps, InputProps } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";

export interface FieldFormProps {
  // input and label
  name: string,
  label: string,
  propsInput?: any,
  type?: string,
  placeholder?: string,

  // control type
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
}

export const FieldForm = (props: FieldFormProps) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props.name);
  const propsInput = {
    name: props.name,
    type: props.type || 'text',
    placeholder: props.placeholder || props.label,
    ...field,
    ...props.propsInput
  }

  const propsControl: FormControlProps = {
    isDisabled: props.isDisabled,
    isRequired: props.isRequired,
    isInvalid: props.isInvalid
  }

  if (props.type === 'file') {
    delete propsInput.value
    propsInput.onChange = (event) => {
      const file = event.target.files[0]
      setFieldValue(props.name, file)
    }
  }

  useEffect(() => {
    if (props.type === 'date') {
      if (field.value) {
        setFieldValue(props.name, field.value.slice(0, 10))
      }
    }
  }, [])


  return (
    <FormControl {...propsControl}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input {...propsInput} />
    </FormControl>
  )
}
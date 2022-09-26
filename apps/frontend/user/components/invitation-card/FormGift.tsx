import { Button, Center, Grid, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { MdClear, MdClose } from "react-icons/md";
interface ItemGift {
  value: number
  label?: string
}

function GiftButton({ giftValue, valueSelected, onChange }) {
  const isSelected = valueSelected === giftValue.value
  return (
    <Center>
      <Button
        colorScheme={isSelected ? null : 'gray'}
        variant={isSelected ? 'solid' : 'outline'}
        w={{ sm: 'full', md: '180' }}
        onClick={() => {
          if (isSelected) {
            return onChange(0)
          }
          onChange(giftValue.value)
        }}
        rightIcon={isSelected && <MdClose />}
      >
        {giftValue.label}
      </Button>
    </Center>
  )
}


export function InvitationFormGift({ value, onChange }) {

  const giftOptions = [20, 50, 100, 500, 700, 1000]

  const giftList: ItemGift[] = giftOptions.map((v) => ({
    label: `Rp. ${v}K`,
    value: v * 1000
  }))

  return (
    <Stack>
      <Grid templateColumns='repeat(3, 1fr)' templateRows='1fr 1fr' gap='3'>
        {giftList.map((v, i) => (
          <GiftButton
            key={i}
            giftValue={v}
            valueSelected={value}
            onChange={onChange}
          />
        ))}
      </Grid>
      <InputGroup>
        <InputLeftElement>
          Rp.
        </InputLeftElement>
        <Input
          type='number'
          placeholder="Custom"
          value={value}
          onChange={(e) => onChange(+e.target.value)} />
        <InputRightElement onClick={() => onChange(0)} cursor='pointer'>
          <MdClear></MdClear>
        </InputRightElement>
      </InputGroup>
    </Stack>
  )
}
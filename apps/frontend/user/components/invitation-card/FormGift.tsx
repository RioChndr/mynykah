import { Button, Center, Grid, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { MdClear } from "react-icons/md";
interface ItemGift {
  value: number
  label?: string
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
          <Center>
            <Button
              colorScheme={value === v.value ? null : 'gray'}
              variant={value === v.value ? 'solid' : 'outline'}
              w={{ sm: 'full', md: '180' }}
              onClick={() => {
                if (value === v.value) {
                  return onChange(0)
                }
                onChange(v.value)
              }}
            >
              {v.label}
            </Button>
          </Center>
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
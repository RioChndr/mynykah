import { Button, Center, Grid, Input, InputGroup, InputLeftAddon, InputLeftElement, Stack } from "@chakra-ui/react";
import { useState } from "react";

export function InvitationFormGift() {
  interface ItemGift {
    value: number
    label?: string
  }

  const [selected, setSelected] = useState<ItemGift>()

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
              colorScheme={selected?.value === v.value ? null : 'gray'}
              variant={selected?.value === v.value ? 'solid' : 'outline'}
              w={{ sm: 'full', md: '180' }}
              onClick={() => {
                setSelected(v)
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
          value={selected?.value}
          onChange={(e) => setSelected({
            value: +e.target.value
          })} />
      </InputGroup>
    </Stack>
  )
}
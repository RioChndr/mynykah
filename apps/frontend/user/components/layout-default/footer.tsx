import { Box, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <>
      <Box p='3' display='flex' m='-1' border='1px' borderColor='gray'>
        <Text fontWeight='semibold'>
          Mynykah @{new Date().getFullYear()}. Created By Rio Chandra
        </Text>
      </Box>
    </>
  )
}
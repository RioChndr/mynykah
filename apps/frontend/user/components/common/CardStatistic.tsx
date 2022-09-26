import { Box, Flex, HStack, Stat, StatLabel, StatNumber, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface CardStatisticProps {
  name: string
  number: string | number
  icon?: JSX.Element
  to?: string
}
export function CardStatistic(props: CardStatisticProps) {
  const router = useRouter()
  return (
    <Stat
      border='1px' borderColor='gray' borderRadius='lg' position='relative' overflow='hidden'
      _hover={{ cursor: 'pointer', borderColor: 'primary' }}
      onClick={() => props.to && router.push(props.to)}
    >
      <Box p={{ base: '3', md: '6' }} >
        <HStack alignItems={'start'}>
          {props.icon}
          <Box justifyContent={'start'}>
            <StatLabel>
              {props.name}
            </StatLabel>
            <StatNumber>
              {props.number ?? 0}
            </StatNumber>
          </Box>
        </HStack>
      </Box>
    </Stat>
  )
}
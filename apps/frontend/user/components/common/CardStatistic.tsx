import { Box, Flex, HStack, Stat, StatLabel, StatNumber, VStack } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface CardStatisticProps {
  name: string
  number: string | number
  icon?: JSX.Element
}
export function CardStatistic(props: CardStatisticProps) {
  return (
    <Stat
      border='1px' borderColor='gray' borderRadius='lg' position='relative' overflow='hidden'
    >
      <Box p={{ base: '3', md: '6' }} >
        <HStack alignItems={'start'}>
          {props.icon}
          <Box justifyContent={'start'}>
            <StatLabel>
              {props.name}
            </StatLabel>
            <StatNumber>
              {props.number}
            </StatNumber>
          </Box>
        </HStack>
      </Box>
    </Stat>
  )
}
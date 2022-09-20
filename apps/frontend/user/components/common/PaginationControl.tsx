import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"

export interface PaginationControlProps {
  page?: number
  total?: number
  isDisabled?: boolean
  onChange?: (page: number) => void
}

export function PaginationControl(props: PaginationControlProps) {
  return (
    <ButtonGroup variant={'outline'} colorScheme='gray' size="sm">
      <HStack spacing={2}>
        <Button
          onClick={() => props.onChange(props.page - 1)}
          disabled={props.isDisabled || props.page === 1}
        >
          <BsArrowLeftShort></BsArrowLeftShort>
        </Button>
        <Text>
          Page {props.page || 1} of {props.total}
        </Text>
        <Button
          onClick={() => props.onChange(props.page + 1)}
          disabled={props.isDisabled || props.page === props.total}
        >
          <BsArrowRightShort></BsArrowRightShort>
        </Button>
      </HStack>
    </ButtonGroup>
  )
}

export function CalculateTotalPage(totalItem: number, perPage: number) {
  return Math.ceil(totalItem / perPage)
}

export function usePaginationControl() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  return {
    page,
    limit,
    changePage: (page: number) => setPage(page),
    calculateTotalPage: CalculateTotalPage
  }
}
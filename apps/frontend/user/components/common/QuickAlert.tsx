import { Alert, AlertIcon, AlertStatus, AlertTitle } from "@chakra-ui/react"
import { ReactNode } from "react"

export function QuickAlert(props: {
  children?: JSX.Element | ReactNode,
  status?: AlertStatus
}) {
  return (
    <Alert status={props.status || 'info'}>
      <AlertIcon />
      <AlertTitle>{props.children}</AlertTitle>
    </Alert>
  )
}
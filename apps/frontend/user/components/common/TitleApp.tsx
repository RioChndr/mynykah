import { Badge, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useAppConfig } from "../../config/app-config";

function BadgeBeta() {
  const appConfig = useAppConfig();
  if (!appConfig.isBeta) return <></>
  return (
    <Link href='/about' passHref>
      <Badge as='a' colorScheme="red" ml="1">
        Beta
      </Badge>
    </Link>
  )
}

export function TitleApp() {
  const appConfig = useAppConfig();
  return (
    <>
      <Link href='/' passHref>
        <Text as='a'>
          {appConfig.name}
        </Text>
      </Link>
      <BadgeBeta />
    </>
  )
}
import { Badge } from "@chakra-ui/react";
import Link from "next/link";
import { AppConfig } from "../../config/app-config";

function BadgeBeta() {
  if (!AppConfig.isBeta) return <></>
  return (
    <Link href='/about' passHref>
      <Badge as='a' colorScheme="red" ml="1">
        Beta
      </Badge>
    </Link>
  )
}

export function TitleApp() {
  return (
    <>
      {AppConfig.name} <BadgeBeta />
    </>
  )
}
import { Button, Link as LinkHref } from "@chakra-ui/react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export function ButtonOpenInvitationCard({ id, ...rest }) {
  const path = `/invitation/${id}/preview`
  return (
    <Link href={path} passHref>
      <Button as='a' rightIcon={<FiArrowUpRight />} {...rest}>
        Buka undangan
      </Button>
    </Link>
  )
}

export function ButtonInviationLink({ id }) {
  const url = `/invitation/${id}`
  return (
    <Link href={url}>
      <LinkHref>Kembali</LinkHref>
    </Link>
  )
}
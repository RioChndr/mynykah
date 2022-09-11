import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { Router } from "next/router";
import { FiArrowUpRight } from "react-icons/fi";

export function ButtonOpenInvitationCard({ id, ...rest }) {
  const path = `/invitation/${id}`
  return (
    <Link href={path} passHref>
      <Button as='a' rightIcon={<FiArrowUpRight />} {...rest}>
        Buka undangan
      </Button>
    </Link>
  )
}
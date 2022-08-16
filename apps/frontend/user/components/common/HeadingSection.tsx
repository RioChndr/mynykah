import { Box, Flex, Heading, Switch, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface HeadingSectionProps{
  title: string,
  description?: string
  switchShow?: boolean
  switchIsChecked?: boolean
  children?: ReactNode
}

export function HeadingSection (props: HeadingSectionProps){
  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading size='lg'>
          {props.title}
        </Heading>
        {props.switchShow && <Switch isChecked={props.switchIsChecked} />}
        {props.children}
      </Flex>
      <Text mt='2'>
        {props.description}
      </Text>
    </Box>
  )
}

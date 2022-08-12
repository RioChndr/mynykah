import { Box, Flex, Button, Text, Container, Avatar, Wrap, WrapItem, HStack, Menu, MenuButton, MenuList, MenuItem, Link, useBreakpointValue, useColorModeValue, ButtonGroup, IconButton } from "@chakra-ui/react";
import Router from "next/router";
import NextLink from 'next/link'
import { useAuth } from "../../lib/auth/useAuth";
import { FiMenu } from 'react-icons/fi'

export default function Navbar() {
  const authContext = useAuth()
  const Listmenu: {text: string, to: string}[] = [
    {text: "Home", to: '/home'},
    {text: "Contact", to: '/contact'},
    {text: "About", to: '/about'},
  ]
  const ListMenuComponent = () => {
    return (
      <ButtonGroup variant="link" spacing="8">
        {Listmenu.map((item, i) => (
          <NextLink href={item.to} key={i} passHref>
            <Button as='a'>{item.text}</Button>
          </NextLink>
        ))}
      </ButtonGroup>
    )
  }

  const ProfileMenuComponent = () => {
    if(!authContext.user){
      return (
        <HStack spacing="3">
          <Button variant="ghost" onClick={() => Router.push('/login')}>Sign in</Button>
          <Button variant="primary" onClick={() => Router.push('/login')}>Sign up</Button>
        </HStack>
      )
    }
    return (
      <Menu>
        <MenuButton>
          <Avatar name={authContext.user?.name} src={authContext.user?.picture} bg='primary' color='white' outline='1'/>
        </MenuButton>
        <MenuList>
          <MenuItem>Account</MenuItem>
          <MenuItem onClick={() => authContext.logout()}>Logout</MenuItem>
        </MenuList>
      </Menu>
    )
  }

  const isDesktop = useBreakpointValue({ base: false, lg: true })
  return (
    <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
        <Container py={{ base: '4', lg: '5' }}>
          <HStack spacing="10" justify="space-between">
            <Link href='/'>
              <Text fontSize='2xl' fontWeight='bold'>
                Mynykah
              </Text>
            </Link>
              {isDesktop ? (
                <Flex justify="space-between" flex="1">
                  {ListMenuComponent()}
                  {ProfileMenuComponent()}
                </Flex>
              ) : (
                <IconButton
                  variant="ghost"
                  icon={<FiMenu />}
                  aria-label="Open Menu"
                />
              )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}
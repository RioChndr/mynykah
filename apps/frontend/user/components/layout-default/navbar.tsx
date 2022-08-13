import { Box, Flex, Button, Text, Container, Avatar, Wrap, WrapItem, HStack, Menu, MenuButton, MenuList, MenuItem, Link, useBreakpointValue, useColorModeValue, ButtonGroup, IconButton, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, Divider, StackDirection } from "@chakra-ui/react";
import Router from "next/router";
import NextLink from 'next/link'
import { useAuth } from "../../lib/auth/useAuth";
import { FiMenu } from 'react-icons/fi'
import React from "react";

interface MenuItemInterface {
  text: string
  to?: string
  onClick?: any
}

export default function Navbar() {
  const authContext = useAuth()
  const Listmenu:MenuItemInterface[] = [
    {text: "Home", to: '/home'},
    {text: "Contact", to: '/contact'},
    {text: "About", to: '/about'},
  ]

  const AccountMenuList:MenuItemInterface[] = [
    {text: 'Account', to: '/account'},
    {text: 'Logout', onClick: () => authContext.logout()},
  ]

  const ListMenuComponent = ({ isVertical = false }) => {
    return (
      <Stack spacing="8" direction={isVertical ? 'column' : 'row'}>
        {Listmenu.map((item, i) => (
          <NextLink href={item.to} key={i} passHref>
            <Button as='a' variant="link">{item.text}</Button>
          </NextLink>
        ))}
      </Stack>
    )
  }

  const ButtonAuth = ({ direction }: {direction: StackDirection}) => {
    return (
      <Stack spacing="3" direction={direction}>
        <Button variant="ghost" onClick={() => Router.push('/login')}>Sign in</Button>
        <Button variant="primary" onClick={() => Router.push('/login')}>Sign up</Button>
      </Stack>
    )
  }

  const ProfileMenuComponent = () => {
    if(!authContext.user){
      return (
        <ButtonAuth direction="row" />
      )
    }

    const AccountMenuListComponent = () => {
      const listMenu = AccountMenuList.map((menu, i) => {
        let MenuItemProps:any = {}
        if(menu.to){
          MenuItemProps = {
            onClick: () => Router.push(menu.to)
          }
        }
        if(menu.onClick){
          MenuItemProps = {
            onClick : menu.onClick
          }
        }

        return (
          <MenuItem {...MenuItemProps} key={i}>{menu.text}</MenuItem>
        )
      })
      return (
        <MenuList>
          {listMenu}
        </MenuList>
      )
    }

    return (
      <Menu>
        <MenuButton>
          <Avatar name={authContext.user?.name} src={authContext.user?.picture} bg='primary' color='white' outline='1'/>
        </MenuButton>
        <AccountMenuListComponent />
      </Menu>
    )
  }
  
  const DrawerSide = ({ isDesktop }) => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const buttonRef = React.useRef()

    const AccountComponent = () => {
      if(!authContext.user){
        return (<ButtonAuth direction="column" />)
      }
      const listMenuAccountComponent = () => (
        AccountMenuList.map((menu, i) => {
          const boxProps:any = {}
          if(menu.to){
            boxProps.onClick = () => Router.push(menu.to)
          }
          if(menu.onClick){
            boxProps.onClick = menu.onClick
          }
          return (
            <Box {...boxProps} padding='2' mt='6' cursor='pointer'>
              <Text size='md' color='primary' fontWeight='bold'>
                {menu.text}
              </Text>
            </Box>
          )
        })
      )

      return (
        <div>
          <Box display='flex' alignItems='center'>
            <Avatar name={authContext.user?.name} src={authContext.user?.picture} bg='primary' color='white' outline='1' mr='3'/>
            <Text size="2xl">{authContext.user?.name}</Text>
          </Box>
          {listMenuAccountComponent()}
        </div>
      )
    }

    return (
      <>
        <IconButton
          ref={buttonRef}
          variant="ghost"
          icon={<FiMenu />}
          aria-label="Open Menu"
          onClick={onOpen}
        />
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement='right'
          finalFocusRef={buttonRef}
        >
          <DrawerOverlay></DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              Mynykah
            </DrawerHeader>

            <DrawerBody>
              <ListMenuComponent isVertical={true} />
              <Divider my='6' />
              <AccountComponent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
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
                  <ListMenuComponent />
                  <ProfileMenuComponent />
                </Flex>
              ) : (
                <DrawerSide isDesktop={isDesktop} />
              )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}
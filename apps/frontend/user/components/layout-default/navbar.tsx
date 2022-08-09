import { Box, Flex, Button, Text, Container, Avatar, Wrap, WrapItem, HStack, Menu, MenuButton, MenuList, MenuItem, Link } from "@chakra-ui/react";
import Router from "next/router";
import { useAuth } from "../../lib/auth/useAuth";
// import Router from "next/router";
// import { useContext } from "react";
// import { AuthContext } from "../../lib/auth/auth-context";

export default function Navbar(props) {
  const authContext = useAuth()
  const ListMenu = () => {
    const list: {text: string, to: string}[] = [
      {text: "Home", to: '/home'},
      {text: "Contact", to: '/contact'},
      {text: "About", to: '/about'},
    ]
    return list.map((menu, i) => (
      <Link href={menu.to} key={i}>
        <Text>
          {menu.text}
        </Text>
      </Link>
    ))
  }

  return (
    <Box m='-1px' border='1px' borderColor='gray' display='flex' justifyContent='center'>
      <Container maxW='container.xl' height='4.5rem' display='flex' alignItems='center' justifyContent='space-between'>
        <Box>
          <Link href='/'>
            <Text fontSize='2xl' fontWeight='bold'>
              Mynykah
            </Text>
          </Link>
        </Box>
        <HStack spacing='3'>
          <HStack mr='3' display='flex' spacing='3'>
            {ListMenu()}
          </HStack>
          {
            !authContext.user ?
            <Button size='sm' onClick={() => Router.push('/login')}>
              Login   
            </Button>
            :
            <Menu>
              <MenuButton>
                <Avatar name={authContext.user?.name} src={authContext.user?.picture} bg='primary' color='white' outline='1'/>
              </MenuButton>
              <MenuList>
                <MenuItem>Account</MenuItem>
                <MenuItem onClick={() => authContext.logout()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          }
        </HStack>
      </Container>
    </Box>
  )
}
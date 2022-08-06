import { Box, Flex, Button, Text, Container, Avatar, Wrap, WrapItem, HStack, Menu, MenuButton, MenuList, MenuItem, Link } from "@chakra-ui/react";
import { useState } from "react";

export default function Navbar(props) {
  const [isLoggedin, setIsLoggedin] = useState(false)
  const ListMenu = () => {
    const list: {text: string, to: string}[] = [
      {text: "Home", to: '/'},
      {text: "Contact", to: '/contact'},
      {text: "About", to: '/about'},
    ]
    return list.map((menu) => (
      <Link href={menu.to}>
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
            !isLoggedin ?
            <Button size='sm' onClick={() => setIsLoggedin(true)}>
              Login
            </Button>
            :
            <Menu>
              <MenuButton>
                <Avatar name="Rio chandra" bg='primary' color='white' outline='1'/>
              </MenuButton>
              <MenuList>
                <MenuItem>Account</MenuItem>
                <MenuItem onClick={() => setIsLoggedin(false)}>Logout</MenuItem>
              </MenuList>
            </Menu>
          }
        </HStack>
      </Container>
    </Box>
  )
}
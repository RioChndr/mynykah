import { Button, Center, Flex } from '@chakra-ui/react';
import Link from 'next/link';

export function Index() {
  return (
    <Center mt='3'>
      <Flex gap='3'>
        <Link href='/login'>
          <Button colorScheme='blue'>
            Login
          </Button>
        </Link>
        <Link href='/register'>
          <Button variant='outline'>
            Register
          </Button>
        </Link>
      </Flex>
    </Center>
  );
}

export default Index;

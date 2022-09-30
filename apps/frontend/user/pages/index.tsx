import { Box, Button, Center, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { HeadTitle } from '../components/common/HeadTitle';
import { TitleApp } from '../components/common/TitleApp';
import { AppConfig } from '../config/app-config';

export function Index() {
  const CardFeature = ({ title, desc }: { title?: string, desc?: string }) => {
    return (
      <Box px='3' py='6' borderRadius='4' border='1px' borderColor='primary' textAlign='center' width={{ base: 'full', lg: '30%' }}>
        <Heading size='md'>
          {title || 'feature 1'}
        </Heading>
        {desc || 'description'}
      </Box>
    )
  }

  const listFeature = [
    [
      'Custom Theme',
      'Peronalisasi tema sesuaikan dengan hubungan anda'
    ],
    [
      'RSVP',
      'Fitur yang memastikan undangan anda dibalas dan datang sesuai kapasitas acara'
    ],
    [
      'Our Story',
      'Ceritakan hubungan indah anda ke pengunjung'
    ],
    [
      'Rundown Acara',
      'Rundown acara dapat memastikan pengunjung anda tau kapan harus datang'
    ]
  ]

  return (
    <Center mt='3' flexDir='column'>
      <HeadTitle title='Home'></HeadTitle>
      <Stack direction='column' textAlign='center' spacing='4'>
        <Heading size='4xl' marginBottom='6'>
          <TitleApp></TitleApp>
        </Heading>
        <Heading size='xl'>
          Bersedia untuk menikah sekarang ?
        </Heading>
        <Text>
          Buat kartu undangan modern disini. <strong>Gratis</strong>
        </Text>
        <div>
          <Link href='/dashboard' passHref>
            <Button as='a'>
              Mulai disini
            </Button>
          </Link>
        </div>
      </Stack>
      <Container>
        <Stack marginTop='12'>
          <Heading size='lg' textAlign='center' mb='3'>
            Feature
          </Heading>
          <Stack direction={{ base: 'column', lg: 'row' }}>
            {
              listFeature.map((feat, i) => (
                <CardFeature key={i} title={feat[0]} desc={feat[1]} />
              ))
            }
          </Stack>
        </Stack>
      </Container>
    </Center>
  );
}

export default Index;

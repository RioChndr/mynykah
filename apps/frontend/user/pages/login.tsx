import { Alert, AlertIcon, AlertTitle, Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HeadTitle } from "../components/common/HeadTitle";
import { TitleApp } from "../components/common/TitleApp";
import { useAuth } from "../lib/auth/useAuth";

declare global {
  interface Window {
    LoginOnSignin: any;
    google: any
  }
}

export function Login(props) {
  const router = useRouter()
  const [isError, setIsError] = useState<any>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const { loginStrategy, user } = useAuth()
  const redirectUrl = router.query.r + ""

  useEffect(() => {
    if (user) {
      redirectToDashboard()
    }
  }, [user])

  async function onSignIn(googleUser: any) {
    try {
      setIsLoading(true)
      await loginStrategy.withGoogle(googleUser)
      redirectToDashboard()
    } catch (err) {
      console.log(err)
      setIsError('failed login')
    }
    setIsLoading(false)
  }

  function redirectToDashboard() {
    if (redirectUrl && redirectUrl !== 'undefined') {
      return router.push(redirectUrl)
    }
    router.push('/dashboard')
  }

  return (
    <>
      <HeadTitle title='Login'></HeadTitle>
      <Center mt='3' padding='3'>
        <Box alignContent='center' border='1px' borderRadius='md' p='9' borderColor='primary' maxWidth={['full', 'sm']}>
          <Box>
            <Box textAlign='center'>
              <Text fontSize='3xl' fontWeight='bold' color='primary'>
                <TitleApp></TitleApp>
              </Text>
              <Text fontSize='xl' my='6'>
                <strong>
                  Masuk
                </strong>
                &nbsp;atau&nbsp;
                <strong>
                  Daftar
                </strong>
              </Text>
              <Text>
                Login mynykah hanya menggunakan akun google anda
              </Text>
            </Box>
            <Center display='flex' flexDirection='column' marginTop='6'>
              {isError ?
                <Alert status='error' mb='3'>
                  <AlertIcon />
                  <AlertTitle>Failed to login, please try again</AlertTitle>
                </Alert>
                : ''}
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={onSignIn}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                /></GoogleOAuthProvider>
              {
                isLoading ? <CircularProgress isIndeterminate color='green.300' /> : ''
              }
            </Center>
          </Box>
        </Box>
      </Center>
    </>
  )
}

export default Login
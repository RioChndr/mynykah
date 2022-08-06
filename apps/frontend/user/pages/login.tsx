import { Alert, AlertIcon, AlertTitle, Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import { UserCredGoogle } from "../lib/useAuth/type";
import { useLogin } from "../lib/useLogin/useLogin";

declare global {
  interface Window {
    LoginOnSignin:any;
  }
}

export function Login(props){
  const {
    isDone,
    isError,
    isLoading,
    doLogin
  } = useLogin('google')

  useEffect(() => {
    if(isDone){
      Router.push('/home')
    }
  }, [isDone])

  function onSignIn(googleUser: UserCredGoogle) {
    doLogin(googleUser)
  }

  // Register to window
  useEffect(() => {
    window.LoginOnSignin = onSignIn
  }, [])
  
  return (
    <>
      <Head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </Head>
      <Center mt='3'>
        <Box alignContent='center' border='1px' borderRadius='md' p='3'>
          <Box textAlign='center'>
            <Text fontSize='3xl' fontWeight='bold'>
              Mynykah
            </Text>
            <hr />
            <Text fontSize='xl' my='3'>
              Login
            </Text>
          </Box>
          <Center display='flex' flexDirection='column'>
            {isError ? 
            <Alert status='error' mb='3'>
              <AlertIcon />
              <AlertTitle>Failed to login, please try again</AlertTitle>
            </Alert>
             : ''}
            <div id="g_id_onload"
                data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                data-context="signup"
                data-ux_mode="popup"
                data-callback="LoginOnSignin"
                data-auto_select="true">
            </div>

            <div className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signup_with"
                data-size="medium"
                data-logo_alignment="left">
            </div>
            {
              isLoading ? <CircularProgress isIndeterminate color='green.300' /> : ''
            }
          </Center>
        </Box>
      </Center>
    </>
  )
}

export default Login
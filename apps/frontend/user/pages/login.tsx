import { Alert, AlertIcon, AlertTitle, Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ResultProvider } from "../lib/auth/type";
import { useAuth } from "../lib/auth/useAuth";

declare global {
  interface Window {
    LoginOnSignin:any;
    google:any
  }
}

export function Login(props){
  const [isDone, setIsDone] = useState<Boolean>(false)
  const [isError, setIsError] = useState<any>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const { loginStrategy, saveToken, fetchUser } = useAuth()
  const [count, setCount] = useState(0)

  const ButtonLoginGoogle = ({ refButton }) => {
    const [isClient, setIsClient] = useState(false)
    // rerender button google every time rendering
    useEffect(() => {
      setIsClient(true)
      initButtonGoogle()
    })
    return !isClient ? null : (
      <>
        <div id="g_id_onload"
          data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          data-context="signup"
          data-ux_mode="popup"
          data-callback="LoginOnSignin"
          data-auto_select="true">
        </div>

        <div className="g_id_signin"
          ref={refButton}
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signup_with"
          data-size="medium"
          data-logo_alignment="left">
        </div>
      </>
    )
  }

  const initButtonGoogle = () => {
    if(!window.google) return;
    window.google.accounts.id.initialize({
      client_id:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: onSignIn,
    })
    window.google.accounts.id.prompt()
    window.google.accounts.id.renderButton(refButtonGoogle.current, {
      theme: 'outline',
      size: 'large',
    })
  }

  const refButtonGoogle = React.createRef()
  useEffect(() => {
    if(!window.google){
      console.log('window.google not found')
      return;
    }
    initButtonGoogle()
  })

  async function onSignIn(googleUser: any) {
    try{
      setIsLoading(true)
      await loginStrategy.withGoogle(googleUser)
      setIsDone(true)
      Router.push('/home')
    }catch(err){
      console.log(err)
      setIsError('failed login')
    }
    setIsLoading(false)
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
      <Center mt='3' padding='3'>
        <Box alignContent='center' border='1px' borderRadius='md' p='9' borderColor='primary' maxWidth={['full', 'sm']}>
          <Box>
            <Box textAlign='center'>
              <Text fontSize='3xl' fontWeight='bold' color='primary'>
                Mynykah
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
              <ButtonLoginGoogle refButton={refButtonGoogle} />
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
import { Box, Center, Text } from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import { LoginWithGoogle } from "../auth/auth-provider";
import { UserCredGoogle } from "../auth/type";

declare global {
  interface Window {
    LoginOnSignin:any;
  }
}

export function Login(props){
  const [error, setError] = useState(null)

  function onSignIn(googleUser: UserCredGoogle) {
    LoginWithGoogle(googleUser).then((val) => {
      Router.push('/home')
    }).catch((err) => {

    })
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
          <Center>
            {error ? <div>{error}</div> : ''}
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
          </Center>
        </Box>
      </Center>
    </>
  )
}

export default Login
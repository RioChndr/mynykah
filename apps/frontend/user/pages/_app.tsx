import { AppPropsOptions } from '../type/app-type';
import { LayoutSystem } from '../layouts/layout-system';
import Head from 'next/head';
import React from 'react';

function CustomApp(props: AppPropsOptions) {
  return <LayoutSystem {...props}>
    <>
      <Head>
        <title>MyNykah</title>
      </Head>
      <props.Component {...props.pageProps} />
    </>
  </LayoutSystem>
}

export default CustomApp;

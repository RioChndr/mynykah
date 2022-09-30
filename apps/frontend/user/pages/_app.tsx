import { AppPropsOptions } from '../type/app-type';
import { LayoutSystem } from '../layouts/layout-system';
import Head from 'next/head';
import React from 'react';
import { AppConfig } from '../config/app-config';

function CustomApp(props: AppPropsOptions) {
  return <LayoutSystem {...props}>
    <>
      <Head>
        <title>{AppConfig.name}</title>
        <link rel="icon" type="image/x-icon" href="/icon.png" />
      </Head>
      <props.Component {...props.pageProps} />
    </>
  </LayoutSystem>
}

export default CustomApp;

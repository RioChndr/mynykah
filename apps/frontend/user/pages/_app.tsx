import Head from 'next/head';
import { useAppConfig } from '../config/app-config';
import { LayoutSystem } from '../layouts/layout-system';
import { AppPropsOptions } from '../type/app-type';

function CustomApp(props: AppPropsOptions) {
  const appConfig = useAppConfig()

  return <LayoutSystem {...props}>
    <>
      <Head>
        <title>{appConfig.name}</title>
        <link rel="icon" type="image/x-icon" href="/icon.png" />
      </Head>
      <props.Component {...props.pageProps} />
    </>
  </LayoutSystem>
}

export default CustomApp;

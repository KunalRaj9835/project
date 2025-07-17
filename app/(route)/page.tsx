import { NextPage } from 'next';
import Head from 'next/head';
import KYCForm from '@/components/KYCForm';

const KYCPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>KYC Verification | Your App Name</title>
        <meta name="description" content="Complete your KYC verification process" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <KYCForm />
      </main>
    </>
  );
};

export default KYCPage;
import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import ImportCSVContainer from '../components/ImportCSVContainer';

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOnClick = () => {
    setShowModal((_) => !_);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Vesting Schedule</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <button
          onClick={handleOnClick}
          className="px-6 py-3 rounded-full border text-gray-700 w-96 hover:bg-primary hover:border-primary hover:text-white"
        >
          Import
        </button>
        <ImportCSVContainer show={showModal} hide={() => setShowModal(false)} />
      </main>
    </div>
  );
};

export default Home;

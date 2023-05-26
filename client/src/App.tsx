import React, { useState } from 'react';
import './App.css';
import '@assets/style/utilities.css';
import { useMediaQuery } from 'react-responsive';
import PcHeader from '@components/Header/PcHeader';
import MHeader from '@components/Header/MHeader';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const [dropDown, setDropDown] = useState(false);

  return (
    <div>{isMobile ? <MHeader dropDown={dropDown} setDropDown={setDropDown} /> : <PcHeader />}</div>
  );
}

export default App;

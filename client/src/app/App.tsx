import { useMediaQuery } from 'react-responsive';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import '@styles/antd-custom-styles.css';
import '@styles/tailwind-custom-styles.css';
import '@styles/swal-custom.styles.css';
import PcHeader from '@components/Common/Layout/Header/PcHeader';
import MHeader from '@components/Common/Layout/Header/MHeader';
import Main from '@pages/Main';
import { Login } from '@pages/Login';
import { Signup } from '@pages/Signup';
import { setUser } from '@features/User/userSlice';
import { useGetUserQuery } from '@features/User/userApi';
import { useEffect } from 'react';
import { useAppDispatch } from '@app/store';

const App = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const { data: user } = useGetUserQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  return (
    <>
      {isMobile ? <MHeader /> : <PcHeader />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;

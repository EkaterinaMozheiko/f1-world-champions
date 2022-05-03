import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Races } from './modules';
import { MainPage } from './pages';

export const App: FC = () => (
  <Routes>
    <Route path="/" element={<MainPage />}>
      <Route path=":season" element={<Races />} />
      <Route path="*" element={<MainPage />} />
    </Route>
  </Routes>
);

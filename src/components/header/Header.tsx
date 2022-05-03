import { FC, memo } from 'react';

import F1Logo from '../../assets/f1.svg';

import styles from './header.module.scss';

export const Header: FC = memo(() => (
  <div className={styles.header}>
    <F1Logo className={styles.logo} />
    <h1>F1 World Champions since 2005</h1>
  </div>
));

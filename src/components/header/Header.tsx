import { FC, memo } from 'react';

import F1Logo from '../../assets/f1.svg';
import MenuIcon from '../../assets/menuIcon.svg';

import styles from './header.module.scss';

export const Header: FC<{ onMenuClick: () => void }> = memo(
  ({ onMenuClick }) => {
    return (
      <div className={styles.header}>
        <button className={styles.menuButton}>
          <MenuIcon onClick={onMenuClick} />
        </button>
        <F1Logo className={styles.logo} />
        <h1>F1 World Champions since 2005</h1>
      </div>
    );
  },
);

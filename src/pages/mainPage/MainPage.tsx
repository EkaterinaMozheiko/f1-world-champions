import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Header } from '../../components';
import { useMediaQuery } from '../../helpers/useMediaQuery';
import { useSeason } from '../../helpers/useSeason';
import { Champions, Races } from '../../modules';
import { getRaces } from '../../modules/races/slice';

import styles from './mainPage.module.scss';
import variables from '../../vars.scss';

export const MainPage: FC = memo(() => {
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery(
    `(max-width: ${variables.tabletWidth})`,
  );

  const [isOpen, setIsOpen] = useState(!isTabletOrMobile);

  useEffect(() => {
    setIsOpen(!isTabletOrMobile);
  }, [isTabletOrMobile]);

  const season = useSeason();

  /*
   *  Action is called here because it is more appropriate to place that kind of logic at the higher components.
   *  It helps to keep data flow clearer.
   */
  useEffect(() => {
    if (season) {
      dispatch(getRaces(season));
    }

    if (isTabletOrMobile) {
      setIsOpen(false);
    }
  }, [season]);

  const handleClick = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  return (
    <div className={styles.mainPage}>
      <header className={styles.header}>
        <Header onMenuClick={handleClick} />
      </header>
      <main className={styles.main}>
        {isOpen && (
          <aside className={styles.sidebar}>
            <Champions />
          </aside>
        )}
        <article className={styles.content}>
          <Races />
        </article>
      </main>
    </div>
  );
});

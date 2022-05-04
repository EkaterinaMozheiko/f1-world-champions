import { FC, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Header } from '../../components';
import { useSeason } from '../../helpers/useSeason';
import { Champions, Races } from '../../modules';
import { getRaces } from '../../modules/races/slice';

import styles from './mainPage.module.scss';

export const MainPage: FC = memo(() => {
  const dispatch = useDispatch();

  const season = useSeason();

  /*
   *  Action is called here because it is more appropriate to place that kind of logic at the higher components.
   *  It helps keep data flow clearer.
   */
  useEffect(() => {
    if (season) {
      dispatch(getRaces(season));
    }
  }, [season]);

  return (
    <div className={styles.mainPage}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <Champions />
        </aside>
        <article className={styles.content}>
          <Races />
        </article>
      </main>
    </div>
  );
});

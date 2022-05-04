import { FC, memo, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { selectChampions, selectIsLoading, selectIsFailed } from './slice';
import { getFullName } from '../../helpers/getFullName';
import { Spinner } from '../../components';
import { useSeason } from '../../helpers/useSeason';

import styles from './champions.module.scss';

interface ItemProps {
  isActive: boolean;
  to: string;
  children: ReactNode;
}

const Item: FC<ItemProps> = memo(({ isActive, to, children }) => {
  return (
    <NavLink
      className={classNames(styles.item, { [styles.active]: isActive })}
      to={to}>
      {children}
    </NavLink>
  );
});

export const Champions: FC = memo(() => {
  const season = useSeason();

  const champions = useSelector(selectChampions);
  const isLoading = useSelector(selectIsLoading);
  const isFailed = useSelector(selectIsFailed);

  const items = champions.map(
    ({ driverId, season: driverSeason, familyName, givenName }, index) => {
      const key = `${driverId}-${driverSeason}`;
      const isActive = season ? season === driverSeason : index === 0;
      const content = `${driverSeason} ${getFullName({
        familyName,
        givenName,
      })}`;

      return (
        <Item key={key} to={String(driverSeason)} isActive={isActive}>
          {content}
        </Item>
      );
    },
  );

  if (isLoading) {
    return (
      <div className={styles.centeredWrapper}>
        <Spinner />
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className={styles.centeredWrapper}>
        <div className={styles.message}>
          Request failed &#128543; Please try again
        </div>
      </div>
    );
  }

  return <div className={styles.wrapper}>{items}</div>;
});

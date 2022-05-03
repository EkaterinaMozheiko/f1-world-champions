import { memo } from 'react';

import styles from './spinner.module.scss';

export const Spinner = memo(() => <div className={styles.spinner}></div>);

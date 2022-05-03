import { FC, memo } from 'react';
import classNames from 'classnames';

import styles from './table.module.scss';

interface HeaderCell {
  name: string;
  id: string;
}

interface Row {
  isActiveRow: boolean;
  cells: readonly string[];
  id: string;
}

interface TableProps {
  headerCells: readonly HeaderCell[];
  rows: readonly Row[];
}

const TableHead: FC<{ cells: readonly HeaderCell[] }> = memo(({ cells }) => {
  return (
    <thead>
      <tr>
        {cells.map((cell) => (
          <th key={cell.id}>{cell.name}</th>
        ))}
      </tr>
    </thead>
  );
});

const TableBody: FC<{ rows: readonly Row[] }> = memo(({ rows }) => {
  return (
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.id}
          className={classNames({
            [styles.activeRow]: row.isActiveRow,
          })}>
          {row.cells.map((cell, idx) => (
            <td key={`${cell}-${idx}`}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
});

export const Table: FC<TableProps> = memo(({ headerCells, rows }) => {
  return (
    <table className={styles.table}>
      <TableHead cells={headerCells} />
      <TableBody rows={rows} />
    </table>
  );
});

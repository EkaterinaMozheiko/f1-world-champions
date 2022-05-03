import { render, screen, within } from '@testing-library/react';

import { Table } from './Table';

const HEADER_CELLS = [
  {
    id: 'driver',
    name: 'Driver',
  },
  {
    id: 'raceName',
    name: 'Race name',
  },
  {
    id: 'location',
    name: 'Location',
  },
  {
    id: 'date',
    name: 'Date',
  },
] as const;

const ROWS = [
  {
    isActiveRow: false,
    cells: [
      'Lewis Hamilton',
      'Bahrain Grand Prix',
      'Sakhir, Bahrain',
      '2021-03-28',
    ],
    id: '1',
  },
  {
    isActiveRow: false,
    cells: [
      'Max Verstappen',
      'Emilia Romagna Grand Prix',
      'Imola, Italy',
      '2021-04-18',
    ],
    id: '2',
  },
  {
    isActiveRow: false,
    cells: [
      'Sergio Pérez',
      'Azerbaijan Grand Prix',
      'Baku, Azerbaijan',
      '2021-06-06',
    ],
    id: '3',
  },
] as const;

describe('<Table />', () => {
  test('render header correctly', () => {
    render(<Table headerCells={HEADER_CELLS} rows={ROWS} />);

    HEADER_CELLS.forEach(({ name }) => {
      const header = screen.getByText(name).closest('th')!;

      const utils = within(header);

      expect(utils.getByText(name)).toBeInTheDocument();
    });
  });

  test('render rows correctly', () => {
    render(<Table headerCells={HEADER_CELLS} rows={ROWS} />);

    ROWS.forEach(({ cells }) => {
      const row = screen.getByText(cells[0]).closest('tr')!;

      const utils = within(row);

      cells.forEach((cell) =>
        expect(utils.getByText(cell)).toBeInTheDocument(),
      );
    });
  });
});

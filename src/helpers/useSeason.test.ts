import { renderHook } from '@testing-library/react-hooks';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useSeason } from './useSeason';

const useParamsMock = useParams as ReturnType<typeof jest.fn>;
const useSelectorMock = useSelector as ReturnType<typeof jest.fn>;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('useSeason', () => {
  beforeEach(() => {
    useParamsMock.mockClear();
    useSelectorMock.mockClear();
  });

  test('returns season from url', () => {
    useParamsMock.mockReturnValue({ season: '2007' });
    useSelectorMock.mockReturnValue('2005');

    const { result } = renderHook(() => useSeason());

    expect(result.current).toBe('2007');
  });

  test('returns last season from list of the Champions', () => {
    useParamsMock.mockReturnValue({ season: undefined });
    useSelectorMock.mockReturnValue('2005');

    const { result } = renderHook(() => useSeason());

    expect(result.current).toBe('2005');
  });

  test('returns null', () => {
    useParamsMock.mockReturnValue({ season: undefined });
    useSelectorMock.mockReturnValue(undefined);

    const { result } = renderHook(() => useSeason());

    expect(result.current).toBe(null);
  });
});

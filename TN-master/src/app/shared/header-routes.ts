import { COUNTRIES, GENRES, Link, RANKINGS } from './constant';

interface HeaderRoute {
  name: string;
  path: string;
  isDropdown?: boolean;
  dropdownData?: Link[];
}

export const routes: HeaderRoute[] = [
  {
    name: 'hot',
    path: '',
  },
  {
    name: 'truyện mới',
    path: 'new',
  },
  {
    name: 'thể loại',
    path: 'genre',
    isDropdown: true,
    dropdownData: GENRES,
  },
  {
    name: 'top truyện',
    path: 'rank',
    isDropdown: true,
    dropdownData: RANKINGS,
  },
  {
    name: 'quốc gia',
    path: 'country',
    isDropdown: true,
    dropdownData: COUNTRIES,
  },
  {
    name: 'hoàn thành',
    path: 'finish',
  },
];

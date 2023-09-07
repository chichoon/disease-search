import { useState } from 'react';
import { SearchIcon } from '../../assets';
import { Sick } from '../../types/sick';

import styles from './SearchResultList.module.scss';

interface Props {
  searchResults: Sick[];
}

export const SearchResultList = ({ searchResults }: Props) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <ul className={styles.wrapper}>
      <span>추천 검색어</span>
      {searchResults.map((result, index) => (
        <li key={result.sickCd} className={`${selectedIdx === index ? styles.selected : ''} ${styles.innerElement}`}>
          <SearchIcon />
          <span>{result.sickNm}</span>
        </li>
      ))}
    </ul>
  );
};

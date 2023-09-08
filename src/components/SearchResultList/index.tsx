import { useEffect, useState } from 'react';
import { SearchIcon } from '../../assets';
import { Sick } from '../../types/sick';

import styles from './SearchResultList.module.scss';

interface Props {
  searchResults: Sick[];
}

export const SearchResultList = ({ searchResults }: Props) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  function handleMoveCursor(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      if (selectedIdx === 0) return;
      setSelectedIdx((prev) => prev - 1);
    } else if (e.key === 'ArrowDown') {
      if (selectedIdx === searchResults.length - 1) return;
      setSelectedIdx((prev) => prev + 1);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleMoveCursor);

    return () => window.removeEventListener('keydown', handleMoveCursor);
  }, [handleMoveCursor]);

  return (
    <ul className={styles.wrapper}>
      {searchResults.length > 0 ? (
        <>
          <span>추천 검색어</span>
          {searchResults.map((result, index) => (
            <li
              key={result.sickCd}
              className={`${selectedIdx === index ? styles.selected : ''} ${styles.innerElement}`}
            >
              <SearchIcon />
              <span>{result.sickNm}</span>
            </li>
          ))}
        </>
      ) : (
        <span>검색어 없음</span>
      )}
    </ul>
  );
};

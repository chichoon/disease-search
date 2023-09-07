import { SearchIcon } from './assets';
import { useSearch } from './hooks/useSearch';

import styles from './App.module.scss';
import { SearchResultList } from './components/SearchResultList';

const App = () => {
  const { input, handleChangeInput, searchResults } = useSearch();
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>{`국내 모든 임상시험 검색하고\n온라인으로 참여하기`}</h1>
      </header>
      <main>
        <div className={styles.searchBarWrapper}>
          <SearchIcon />
          <input type='text' value={input} onChange={handleChangeInput} />
          <button type='button' className={styles.searchButton}>
            <span>검색</span>
          </button>
        </div>
        {searchResults.length > 0 && <SearchResultList searchResults={searchResults} />}
      </main>
    </div>
  );
};

export default App;

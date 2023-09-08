import { SearchIcon } from './assets';
import { useSearch } from './hooks/useSearch';

import styles from './App.module.scss';
import { SearchResultList } from './components/SearchResultList';

const App = () => {
  const { input, handleChangeInput, handleClickSearch, searchResults } = useSearch();
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>{`국내 모든 임상시험 검색하고\n온라인으로 참여하기`}</h1>
      </header>
      <main>
        <form className={styles.searchBarWrapper}>
          <SearchIcon />
          <input type='text' value={input} onChange={handleChangeInput} />
          <button type='submit' className={styles.searchButton} onClick={handleClickSearch}>
            <span>검색</span>
          </button>
        </form>
        <SearchResultList searchResults={searchResults} />
      </main>
    </div>
  );
};

export default App;

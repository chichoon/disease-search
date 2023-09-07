import { useState } from 'react';
import logo from './logo.svg';
import { SearchIcon } from './assets';

import styles from './App.module.scss';

const App = () => {
  const [input, setInput] = useState('');
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>{`국내 모든 임상시험 검색하고\n온라인으로 참여하기`}</h1>
      </header>
      <main>
        <div className={styles.searchBarWrapper}>
          <SearchIcon />
          <input type='text' />
          <button type='button' className={styles.searchButton}>
            <span>검색</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;

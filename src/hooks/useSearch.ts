import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Sick } from '../types/sick';
import { DEBOUNCE_TIME, EXPIRE_TIME } from '../constants';

const cacheData: { [key: string]: Sick } = {};

async function fetchSearchResults(input: string) {
  if (cacheData[input]) return cacheData[input];
  const res = await fetch(`${process.env.REACT_APP_SERVER_API}/sick?q=${input}`);
  const data = await res.json();
  cacheData[input] = data;
  setTimeout(() => {
    delete cacheData[input];
  }, EXPIRE_TIME);
  console.info('calling api');
  return data;
}

export function useSearch() {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState<Sick[]>([]);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  async function handleClickSearch(e: FormEvent) {
    e.preventDefault();
    await fetchSearchResults(input).then((data) => {
      setSearchResults(data);
    });
  }

  useEffect(() => {
    const timeoutValue = setTimeout(async () => {
      if (input.length === 0) {
        setSearchResults([]);
        return;
      }
      await fetchSearchResults(input).then((data) => {
        setSearchResults(data);
      });
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(timeoutValue);
    };
  }, [input]);

  return { input, searchResults, handleChangeInput, handleClickSearch };
}

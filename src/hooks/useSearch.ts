import { ChangeEvent, useEffect, useState } from 'react';
import { Sick } from '../types/sick';

async function fetchSearchResults(input: string) {
  const res = await fetch(`${process.env.REACT_APP_SERVER_API}/sick?q=${input}`);
  const data = await res.json();
  console.log(data);
  return data;
}

export function useSearch() {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState<Sick[]>([]);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  useEffect(() => {
    const timeoutValue = setTimeout(async () => {
      if (input.length === 0) setSearchResults([]);
      await fetchSearchResults(input).then((data) => {
        setSearchResults(data);
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutValue);
    };
  }, [input]);

  return { input, searchResults, handleChangeInput };
}

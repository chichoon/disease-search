<h1 align="center"> Disease Search </h1>
<p align="center">
  <img src="https://img.shields.io/badge/-Typescript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/-Sass-CC6699?style=flat-square&logo=Sass&logoColor=white">
</p>

## 기능 소개

![Sep-08-2023 17-39-51](https://github.com/chichoon/disease-search/assets/37893979/f4dfe9c7-51b8-4e72-9c54-30acde36a928)

검색어를 입력하면 검색어가 포함된 질병/질환명을 목록으로 출력합니다

### 검색어 캐싱

![Sep-08-2023 17-40-34](https://github.com/chichoon/disease-search/assets/37893979/cc2befb2-c9db-4058-858f-be194396ad0f)

```
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
```

검색어는 내부적으로 객체 안에 캐싱되고, setTimeout을 이용해 `EXPIRE_TIME` 만큼의 시간이 지나면 소멸됩니다.

컴포넌트를 변화시키는 상태값이 될 필요가 없기 때문에 평범한 객체를 이용하였습니다.

API 호출을 해도 캐싱된 데이터를 불러와 사용하기 때문에 `calling api` 출력이 덜 되는 것을 사진에서 볼 수 있습니다.

### 검색어 디바운싱

```
  useEffect(() => {
    const timeoutValue = setTimeout(async () => {
      if (input.length === 0) {
        setSearchResults([]);
        return;
      }
      await fetchSearchResults(input).then((data) => {
        setSearchResults(data);
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutValue);
    };
  }, [input]);
```

단어가 변할 때마다 API가 call 되는 것을 막기 위해 debouncing을 사용하였습니다.

debouncing은 이벤트를 그룹화하여 특정 시간이 지난 후 함수 호출을 단 한 번만 이루어질 수 있도록 제한합니다.

구현은 `setTimeout` 을 이용했으며, `setTimeout`을 통해 특정 시간 후에 함수가 호출될 수 있도록 하고, 이벤트가 발생할 때마다 (`input` 이 바뀔 때마다) `clearTimeout` 을 통해 이전의 이벤트를 삭제하는 식으로 디바운싱을 구현하였습니다.

### 방향 키를 이용한 추천 검색어 탐색

![Sep-08-2023 18-55-06](https://github.com/chichoon/disease-search/assets/37893979/57ed6734-222b-46aa-9325-6c1fa0c1e9dc)

```
  function handleMoveCursor(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      if (selectedIdx === 0) return;
      setSelectedIdx((prev) => prev - 1);
      document.getElementById('selected')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (e.key === 'ArrowDown') {
      if (selectedIdx === searchResults.length - 1) return;
      setSelectedIdx((prev) => prev + 1);
      document.getElementById('selected')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleMoveCursor);

    return () => window.removeEventListener('keydown', handleMoveCursor);
  }, [handleMoveCursor]);
```

`window` 전역 객체에 이벤트를 설정하여 화면 어디에서든 상하 방향키를 누르면 키보드 이벤트가 발생하도록 하였습니다.

선택한 항목의 인덱스를 바꿔주는 방식으로 검색어 탐색을 구현하였고 선택된 검색어는 하이라이트를 해 주었습니다.

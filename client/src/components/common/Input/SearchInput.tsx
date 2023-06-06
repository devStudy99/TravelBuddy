import { useState, ChangeEvent } from 'react';
import { ReactComponent as Search } from '@image/search.svg';
import { SearchInputContainer, SearchInputBtn, SearchInputField } from '@Input/SearchInput.styles';

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const handleFocus = () => {
    setIsFocused(!isFocused);
  };
  const searchInput = () => {
    console.log('검색');
  };

  return (
    <SearchInputContainer $isFocused={isFocused}>
      <SearchInputField
        type="text"
        placeholder="새로운 여행 동행자를 찾아보세요!"
        onFocus={handleFocus}
        onBlur={handleFocus}
        onChange={changeInput}
      />
      <SearchInputBtn type="button" onFocus={handleFocus} onBlur={handleFocus}>
        <Search onClick={searchInput} />
      </SearchInputBtn>
    </SearchInputContainer>
  );
};

export default SearchInput;

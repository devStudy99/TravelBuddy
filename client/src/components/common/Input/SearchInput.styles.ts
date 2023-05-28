import tw from 'tailwind-styled-components';

interface SearchInputContainerProps {
  $isFocused: boolean;
}

export const SearchInputContainer = tw.div<SearchInputContainerProps>`
  ${({ $isFocused }) => ($isFocused ? 'border-skyblue-500' : 'border-black-070')}
  search-input-outline 
`;

export const SearchInputField = tw.input`
  search-input
  w-full
`;

export const SearchInputBtn = tw.button`
  search-input-btn
`;

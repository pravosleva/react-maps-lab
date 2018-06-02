import styled from 'styled-components';


export const InputSearch = styled('input')`
  font-family: inherit;
    /*padding: 10px 5px;*/
  padding: 11px 10px 11px 42px;
  margin: 0 0 20px 0;
    /*width: 100%;*/
  font-weight: 500;

  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: url('https://png.icons8.com/search/808080') no-repeat 13px 10px;
  -webkit-appearance: none;
  vertical-align: middle;
  background-size: auto 50%;
  &::placeholder { color: rgba(0, 0, 0, 0.6); }
`;

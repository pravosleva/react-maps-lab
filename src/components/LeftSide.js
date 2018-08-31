import styled from 'styled-components';


export const LeftFlexContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
`;

export const SearchSection = styled('div')`
  padding: 20px 20px 20px 20px;
`;

export const ExamplesSection = styled('div')`
  position: relative;
  padding: 10px 20px 20px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  overflow-y: auto;
`;

export const OriginalDocSection = styled('div')`
  padding: 20px 20px 20px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);

  margin-top: auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

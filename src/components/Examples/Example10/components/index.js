import styled, { css, keyframes } from 'styled-components';


export const RelativeLocationPlaceToDisplayInHeader = styled('div')`
  position: relative;
  color: #0399D0;
  margin-left: 45px;
  font-size: 18px;
  font-weight: 500;
  @media(max-width: 767px) { display: none }
`;

export const LocationWrapper = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
`;
export const LocationIcon = styled('div')`
  display: block;
  svg { margin-right: 10px; }
`;
export const LocationLabel = styled('div')`
  cursor: pointer;
`;

export const fadeIn = keyframes`
  from { opacity: 0 };
  to { opacity: 1 };
`;
export const LocationPopup = styled('div')`
  position: absolute;
    /* bottom: -85px; */
  transform: translate(0, 35px);
  ${(p) => p.bottomOffsetValue && css`transform: translate(0, ${p.bottomOffsetValue});`}
  left: -16px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 15px;
  ${(p) => p.desktopPadding && css`@media(min-width: 768px){padding: ${p.desktopPadding};}`}

  ${(p) => p.desktopMinWidth && css`@media(min-width: 768px){min-width: ${p.desktopMinWidth}; width: 100%;}`}
  ${(p) => p.desktopMinHeight && css`@media(min-width: 768px){min-height: ${p.desktopMinHeight}; height: 100%;}`}

  svg {
    position: relative;
  }
  box-shadow: 0px 0px 5px lightgray;
  animation: ${fadeIn} 0.3s ease-in-out;

  z-index: 2;
`;

export const PopupContainer = styled('div')`
  position: relative;
  color: #444;
  font-size: 14px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  white-space: nowrap;
`;

export const LocationArrow = styled('div')`
  width: 20px;
  height: 20px;
  background-color: #fff;
  position: absolute;
  top: -20px;
  transform: rotate(45deg);

  border: 1px solid lightgray;
  border-right: none;
  border-bottom: none;
`;

export const PopupText = styled('dev')`
  margin-right: 10px;
`;

export const PopupButton = styled('button')`
  width: 35px;
  height: 35px;
  padding: 0;
  background-color: transparent;
  border: none;
    /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(p) => p.absoluteRightTop && css`position: absolute; top: 5px; right: 5px;`}

  z-index: 2;
`;

export const Input = styled('input')`
  padding: 10px 10px 10px 15px;
  border: 1px solid #00BCFF;
  border-radius: 4px;
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: normal;
    /* line-height: 24px; */
  color: #333333;
  &::placeholder {
    color: #40B3E9;
  }

  min-width: 308px;

  position: relative;
  z-index: 2;
`;

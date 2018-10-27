import React from 'react';
import {
  // compose, withProps, withHandlers,
  withStateHandlers,
} from 'recompose'; // , withState,
import { connect } from 'react-redux';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { addCounter } from '../../../actions';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import { WrapperContainer } from './components/WrapperContainer';
import { WrapperElement } from './components/WrapperElement';
import { Button } from './components/Button';


injectGlobal`
  .slick-next::before { content: '' !important; }
  .slick-next {
    font-size: inherit !important;
    color: gray !important;
  }
`;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    // <div
    //   className={className}
    //   style={{ ...style, display: "block", background: "red" }}
    //   onClick={onClick}
    // />
    <div
      className={className}
      style={{
        ...style, display: 'block', border: '1px solid gray', width: '40px', height: '40px',
        // TEST
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      onClick={onClick}
    >
      &#10097;&#10097;
      <div style={{ position: 'relative' }}>
        <div
          style={{ position: 'absolute', top: '0', left: '0', transform: 'translate(-62px, 85px) rotate(-90deg)', cursor: 'default' }}
          onClick={(e) => e.stopPropagation()}
        >
          customized&#160;&#10142;
        </div>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const Content = (props) => {
  return (
    <WrapperContainer>
      <WrapperElement>
        <Button onClick={async () => {
          await props.onClick();
          // await props.dispatch(addCounter());
        }}>
          <strong>{`props.localCount= ${props.localCount} | props.globalCount= ${props.globalCount}`}</strong>
        </Button>
      </WrapperElement>
      <WrapperElement carousel>
        <Slider {...sliderSettings}>
          <div>
            <h3>First slide</h3>
          </div>
          <div>
            <h3>Second slide</h3>
          </div>
          <div>
            <h3>Third slide</h3>
          </div>
        </Slider>
      </WrapperElement>
    </WrapperContainer>
  )
};

Content.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapState = ({ counter }) => ({
  globalCount: counter
});

// withStateHandlers
const counterFunctional = withStateHandlers(
  { localCount: 0 },
  {
    onClick: ({ localCount }, props) => () => {
      props.dispatch(addCounter());
      return { localCount: localCount + 1 }
    },
  }
);

export const Example3 = connect(mapState)(counterFunctional(Content));

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
import { WrapperElement, Title } from './components/WrapperElement';
import { Button } from './components/Button';


injectGlobal`
  .slick-prev::before, .slick-next::before { content: '' !important; }
  .slick-prev, .slick-next {
    font-size: inherit !important;
    color: gray !important;
    z-index: 2;
  }
  .slick-list {
    padding: 0 25px 0 25px !important; /* В зависимости от размера стрелок */
    border: 1px dashed lightgray;
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
      <div style={{ position: 'relative' }}>
        &#10097;&#10097;
        <div
          style={{ position: 'absolute', top: '0', left: '0', transform: 'translate(-50px, 90px) rotate(-90deg)', cursor: 'default' }}
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
      style={{
        ...style, display: 'block', border: '1px solid gray', width: '40px', height: '40px',
        // TEST
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      onClick={onClick}
    >
      <div style={{ position: 'relative' }}>
        &#10096;&#10096;
        <div
          style={{ position: 'absolute', top: '0', left: '0', transform: 'translate(-50px, 90px) rotate(-90deg)', cursor: 'default' }}
          onClick={(e) => e.stopPropagation()}
        >
          customized&#160;&#10142;
        </div>
      </div>
    </div>
  );
}
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const Content = (props) => {
  return (
    <WrapperContainer>
      <WrapperElement>
        <Title>HOC state & global prop tst</Title>
        <Button onClick={async () => {
          await props.onClick();
          // await props.dispatch(addCounter());
        }}>
          <span>{`props.localCount= ${props.localCount} | props.globalCount= ${props.globalCount}`}</span>
        </Button>
      </WrapperElement>
      <WrapperElement carousel>
        <Title>Slider tst</Title>
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

import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { updateActiveMarkerKey } from '../../../actions';


const mapState = ({ markers, dispatch }) => ({
  activeMarkerKey: markers.activeMarkerKey,
  dispatch,
});

const InternalContent = compose(
  withHandlers(() => ({
    onClose: (props) => () => {
      (() => {
        props.dispatch(updateActiveMarkerKey('default'));
        return Promise.resolve();
      })()
        .then(() => console.log())
    },
  })),
)(({ activeMarkerKey, text, style, onClick, markerKey , ...props }) => (
  <div
    onClick={() => onClick(text)}
    style={{ display: activeMarkerKey === props.markerKey ? 'block' : 'none', ...style }}
  >
    <code>{text}</code>
    <hr className='style-two' />
    <code>see console...</code>
    <div
      onClick={(e) => {
        e.stopPropagation();
        props.onClose(markerKey);
      }}
      style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 5px 2px 5px', border: '1px solid lightgray', borderRadius: '5px' }}
    >x</div>
  </div>
));

export const InfoWindow = connect(mapState)(InternalContent);

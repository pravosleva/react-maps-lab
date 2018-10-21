import React from 'react';
import { compose } from 'recompose';
import MapComponent from './MapComponent';
import withAbsoluteList from './withAbsoluteList';
import withGoogleMapApiKey from '../../Examples/withGoogleMapApiKey';


export const Issue2 = compose(
  withGoogleMapApiKey,
  withAbsoluteList,
)((ps) => <MapComponent isMarkerShown {...ps} />);

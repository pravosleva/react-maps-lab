import React from 'react';
import { compose } from 'recompose';
import MapComponent from './MapComponent';
// import withLeftSidebar from './withLeftSidebar';
import withGoogleMapApiKey from '../../Examples/withGoogleMapApiKey';


export const Issue2 = compose(
  withGoogleMapApiKey,
  // withLeftSidebar,
)((ps) => <MapComponent isMarkerShown {...ps} />);

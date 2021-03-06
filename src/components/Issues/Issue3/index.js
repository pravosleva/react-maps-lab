import React from 'react';
import { compose } from 'recompose';
import MapComponent from './MapComponent';
import withLeftSidebar from './withLeftSidebar';
import withAbsoluteList from './withAbsoluteList';
import withGoogleMapApiKey from '../../Examples/withGoogleMapApiKey';


export const Issue3 = compose(
  withGoogleMapApiKey,
  withAbsoluteList,
  withLeftSidebar,
)((ps) => <MapComponent isMarkerShown {...ps} />);

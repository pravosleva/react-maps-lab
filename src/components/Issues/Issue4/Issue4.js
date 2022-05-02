import React, { useState, useEffect, Fragment, useMemo, useContext } from "react";
import { useDebouncedCallback } from '../../../common/hooks/useDebouncedCallback'
import { withGoogleAPI, GoogleAPIContext } from '../../../common/context/GoogleAPI'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Circle,
} from "@react-google-maps/api";
import react from "react";
// import { compose } from 'recompose';
// import withGoogleMapApiKey from '../../Examples/withGoogleMapApiKey';

class LoadScriptOnlyIfNeeded extends LoadScript {
  componentDidMount() {
    const cleaningUp = true
    const isBrowser = typeof document !== "undefined" // require('@react-google-maps/api/src/utils/isbrowser')
    const isAlreadyLoaded = !!window.google && !!window.google.maps && !!document.querySelector('body.first-hit-completed') // AJAX page loading system is adding this class the first time the app is loaded
    if (!isAlreadyLoaded && isBrowser) {
      // @ts-ignore
      if (!!window.google && !cleaningUp) {
        console.error("google api is already presented")
        return
      }

      this.isCleaningUp().then(this.injectScript)
    }

    if (isAlreadyLoaded) this.setState({ loaded: true });
  }
}

const containerStyle = {
  display: 'flex',
  height: '100vh',
  width: '100%',
};

const divStyle = {
  background: 'white',
  border: '1px solid #ccc',
  padding: 10,
  margin: 15,
};

const onLoad = (infoWindow) => {
  console.log("infoWindow: ", infoWindow);
};

const position = {
  lat: 43.6532,
  lng: -79.3832,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};


export const Issue4 = withGoogleAPI(() => {
  const { mapRef, setMapRef, googleMapsApiKey } = useContext(GoogleAPIContext)
  const [selected, setSelected] = useState(null);
  const onMapLoad = React.useCallback((map) => {
    setMapRef(map);
  }, []);

  const [rect, setRect] = useState({
    bottomRight: { lat: 0, lng: 0 },
    topRight: { lat: 0, lng: 0 },
    topLeft: { lat: 0, lng: 0 },
    bottomLeft: { lat: 0, lng: 0 },
  })

  const onMapBoundsChanged = React.useCallback((map) => {
    const latlongchange = mapRef.current.getBounds();
    setRect({
      bottomRight: { lat: latlongchange.Ab.h, lng: latlongchange.Va.j },
      topRight: { lat: latlongchange.Ab.j, lng: latlongchange.Va.j },
      topLeft: { lat: latlongchange.Ab.h, lng: latlongchange.Va.h },
      bottomLeft: { lat: latlongchange.Ab.j, lng: latlongchange.Va.h },
    })
  }, [setRect]);
  const onMapBoundsChangedDebounced = useDebouncedCallback(onMapBoundsChanged, 1000)

  const Circles = useMemo(() => {
    return ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'].map((side) => {
      return (
        <Circle
          key={side}
          center={{
            lat: rect[side].lat,
            lng: rect[side].lng,
          }}
          radius={3000}
          options={{
            fillColor: 'rgb(252, 15, 30)',
            fillOpacity: 0.1,
            strokeColor: '#FFF',
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
          onClick={(e) => {
            console.log(e)
          }}
        />
      )
    })
  }, [rect])

  return (
    <LoadScriptOnlyIfNeeded googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onMapLoad}
        onBoundsChanged={onMapBoundsChangedDebounced}
        zoom={14}
      >
        {Circles}

        {selected ? (
          <InfoWindow
            onLoad={onLoad}
            position={position}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div style={divStyle}>
              <h1>La place</h1>
            </div>
          </InfoWindow>
        ) : null}

        <Marker
          className="marker"
          position={position}
          name="My Marker"
          color="blue"
          onClick={() => {
            setSelected(true);
          }}
        />
      </GoogleMap>
    </LoadScriptOnlyIfNeeded>
  );
})

import React, { createContext, useContext, useEffect } from 'react'
import Swal from 'sweetalert2'
import ls from 'local-storage'

export const GoogleAPIContext = createContext({
  mapRef: null,
  setMapRef: () => {},
  googleMapsApiKey: '',
  setGoogleMapsApiKey: () => {
    throw new Error('setGoogleMapsApiKey method should be implemented!')
  }
});

export const withGoogleAPI = (Comp) => {
  const Wrapper = () => {
    const props = useContext(GoogleAPIContext);

    return (
      <Comp {...props} />
    );
  }

  return Wrapper
}

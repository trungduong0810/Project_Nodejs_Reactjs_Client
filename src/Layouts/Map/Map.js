import React from "react";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Map = () => {
  const defaultProps = {
    center: {
      lat: 10.8221642,
      lng: 106.6842705,
    },
    zoom: 17.5,
  };
  return (
    <div>
      <div className="laptop:w-[90%] laptop:h-[80vh] mobile:w-[100%] mobile:h-[60vh] rounded-md overflow-hidden mx-auto">
        <GoogleMapReact
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={defaultProps.center.lat}
            lng={defaultProps.center.lng}
            text=""
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;

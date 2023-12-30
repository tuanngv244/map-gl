import Map, {
  AttributionControl,
  FullscreenControl,
  Layer,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
} from "react-map-gl";
import "./App.css";
import ControlPanel from "./control-panel";
import GeocoderControl from "./geocoder-control";
import { useCallback, useMemo, useRef, useState } from "react";
import { CITIES } from "./data";
import Pin from "./pin";
import { countiesLayer } from "./hight-light-country";
import Store from "./store";

// eslint-disable-next-line
const TOKEN =
  "pk.eyJ1IjoidHVhbm5ndjI0NCIsImEiOiJjbHFxMmpsM2k0NTc3MnJtdTNmaHdvNDZ1In0.1Xd6Lx9DpLGyvGINRy01lw";
function App() {
  const mapRef = useRef<MapRef>();

  const [popupInfo, setPopupInfo] = useState<any>(null);

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city as any);
          }}
        >
          {city.icon === "PIN" ? <Pin /> : <Store />}
        </Marker>
      )),
    []
  );

  const onSelectCity = useCallback(({ longitude, latitude }: any) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 16,
      duration: 2000,
    });
  }, []);

  const _onGetToVietNam = () => {
    mapRef.current?.flyTo({
      center: [108.1720894622796, 15.261682243732155],
      zoom: 5.5,
      duration: 2000,
    });
  };

  const initialViewState = {
    longitude: 108.1720894622796,
    latitude: 15.261682243732155,
    zoom: 5.5,
    // bearing: 0,
    // pitch: 0,
  };

  return (
    <div id="map">
      <Map
        ref={mapRef as any}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/tuanngv244/clqrkb1ds00y501qr4pux93mm"
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
        interactiveLayerIds={["counties"]}
      >
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        <AttributionControl customAttribution="Map design by me" />

        <Source
          type="vector"
          url="mapbox://styles/tuanngv244/clqqmmu8d00x201qv1fez4byy"
        >
          <Layer beforeId="waterway-label" {...countiesLayer} />
        </Source>

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div style={{ color: "black" }}>
              {popupInfo.city}, {popupInfo.state} |{" "}
              <a
                target="_new"
                href={`https://www.google.com/search?q=${popupInfo.city}, ${popupInfo.state}`}
              >
                Google
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>
      <ControlPanel
        _onGetToVietNam={_onGetToVietNam}
        onSelectCity={onSelectCity}
      />
    </div>
  );
}

export default App;

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression, LatLngTuple } from "leaflet";
import { icon } from "leaflet";
import { LoadingOverlay } from "@mantine/core";


const ICON = icon({
  iconUrl: "/pin.svg",
  iconSize: [32, 32],
  iconAnchor: [0, 32],
});

export default function Map(props: { coords: any }) {
  const [center, setCenter] = useState([41, 28]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCenter([props.coords.latitude, props.coords.longitude]);
    setLoading(false);
  }, [props.coords]);

  return (
    <>
      {loading ? (
        <LoadingOverlay visible={loading} overlayBlur={2} />
      ) : (
        <MapContainer
          center={center as LatLngExpression}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "80vh", width: "100wh" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={center as LatLngTuple} icon={ICON}>
            <Popup>Buradasın!</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
}

// MapComponent.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Mapcomponent = () => {
  const position = [ 20.6597, -103.3496]; // Coordenadas de ejemplo

  return (
    <MapContainer center={position} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          ¡Aquí estás!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapcomponent;

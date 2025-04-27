// MapComponent.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
const MapComponentSchool = () => {
  // 1. Define la dirección que quieres mostrar:
  const address = 'Av. México 100, Guadalajara, Jalisco, México';

  // 2. Estado para guardar las coordenadas una vez obtenidas:
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const { data } = await axios.get(
          'https://nominatim.openstreetmap.org/search',
          {
            params: {
              q: address,
              format: 'json',
              limit: 1
            }
          }
        );
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.error('No se encontraron coordenadas para:', address);
        }
      } catch (err) {
        console.error('Error al geocodificar:', err);
      }
    };

    fetchCoords();
  }, [address]);

  // 3. Mientras no tengamos coords, mostramos algo sencillo:
  if (!position) {
    return <p>Cargando mapa para "{address}"…</p>;
  }

  // 4. Renderiza el mapa con las coords obtenidas
  return (
    <MapContainer
      center={position}
      zoom={11}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Dirección: {address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponentSchool;

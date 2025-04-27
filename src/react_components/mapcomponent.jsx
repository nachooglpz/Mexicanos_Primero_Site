// MapComponent.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [escuelas, setEscuelas] = useState([]); // Estado para guardar las escuelas con coordenadas
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const fetchEscuelas = async () => {
      try {
        const { data } = await axios.get('/api/escuelas/direcciones');
        console.log('Direcciones obtenidas:', data);

        const escuelasConCoords = await Promise.all(
          data.map(async (escuela) => {
            try {
              const geoRes = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                  q: escuela.direccion,
                  format: 'json',
                  limit: 1,
                },
              });
              const coords = geoRes.data[0];
              if (coords) {
                return {
                  ...escuela,
                  lat: parseFloat(coords.lat),
                  lng: parseFloat(coords.lon),
                };
              } else {
                console.warn(`No se encontraron coordenadas para: ${escuela.direccion}`);
                return { ...escuela, lat: null, lng: null };
              }
            } catch (geoError) {
              console.error(`Error al geocodificar la dirección: ${escuela.direccion}`, geoError);
              return { ...escuela, lat: null, lng: null };
            }
          })
        );

        console.log('Escuelas con coordenadas:', escuelasConCoords);
        setEscuelas(escuelasConCoords);
        setLoading(false); // Finaliza la carga
      } catch (error) {
        console.error('Error al obtener las direcciones de las escuelas:', error);
        setLoading(false); // Finaliza la carga incluso si hay un error
      }
    };

    fetchEscuelas();
  }, []);

  console.log('Estado de loading:', loading);

  // 3. Mientras se cargan las coordenadas, muestra un mensaje
  if (loading) {
    return <p>Cargando mapa con direcciones de escuelas...</p>;
  }

  // 4. Renderiza el mapa con los marcadores
  return (
    <MapContainer
      center={[20.659698, -103.349609]} // Coordenadas iniciales (puedes ajustarlas)
      zoom={11}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     {/*  <Marker position={[20.659698, -103.349609]}> */}
      {escuelas.map((escuela, index) => (
        escuela.lat && escuela.lng ? ( // Solo renderiza si las coordenadas están definidas
          <Marker key={index} position={[escuela.lat, escuela.lng]}>
            <Popup>
              <h3>{escuela.nombre}</h3>
              <p>{escuela.escuela}</p>
              <p>{escuela.direccion}</p>
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  );
};

export default MapComponent;

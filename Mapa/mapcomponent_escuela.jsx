// MapComponent.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapComponentSchool = ({ username }) => {
  const [aliados, setAliados] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const res = await axios.get('/api/aliados/direcciones'); // Llama al endpoint
        console.log('Datos originales:', res.data); // Verifica los datos originales

        const aliadosConCoords = await Promise.all(
          res.data.map(async (aliado) => {
            try {
              const geoRes = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                  q: aliado.direccion,
                  format: 'json',
                  limit: 1,
                },
              });
              const coords = geoRes.data[0];
              console.log(`Coordenadas para ${aliado.direccion}:`, coords); // Verifica las coordenadas
              return {
                ...aliado,
                lat: coords ? parseFloat(coords.lat) : null,
                lng: coords ? parseFloat(coords.lon) : null,
              };
            } catch (geoError) {
              console.error(`Error al geocodificar la dirección: ${aliado.direccion}`, geoError);
              return { ...aliado, lat: null, lng: null }; // Maneja errores de geocodificación
            }
          })
        );
        console.log('Datos con coordenadas:', aliadosConCoords); // Verifica los datos con coordenadas
        setAliados(aliadosConCoords); // Guarda los datos con coordenadas en el estado
        setLoading(false); // Finaliza la carga
      } catch (error) {
        console.error('Error al obtener las direcciones de los aliados:', error);
        setLoading(false); // Finaliza la carga incluso si hay un error
      }
    };

    fetchDirecciones();
  }, []);

  if (loading) {
    return <p>Cargando mapa...</p>; // Muestra un mensaje mientras se cargan las coordenadas
  }

  return (
    <MapContainer
      center={[20.659698, -103.349609]}
      zoom={11}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {aliados.map((aliado, index) => (
        aliado.lat && aliado.lng ? ( // Solo renderiza si las coordenadas están definidas
          <Marker
            key={index}
            position={[aliado.lat, aliado.lng]}
          >
            <Popup>
              <h3>{aliado.nombre}</h3>
              <p>{aliado.empresa}</p>
              <p>{aliado.direccion}</p>
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  );
};

export default MapComponentSchool;

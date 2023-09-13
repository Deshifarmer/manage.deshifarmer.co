// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
// import L, { divIcon } from "leaflet";
// import seg from "./test-map.json";
// import ecomp from "./test-ecom.json";
// const TestGeoJSONMap = () => {
//   const position = [23.685, 90.3563];
//   //   const position = [23.685, 90.3563];
//   const setColor = ({ properties }) => {
//     return { weight: 1 };
//   };

//   const customMarkerIcon = (name) =>
//     divIcon({
//       html: name,
//       className: "icon",
//     });
//   const setIcon = ({ properties }, latlng) => {
//     return L.marker(latlng, { icon: customMarkerIcon(properties.Name) });
//   };
//   return (
//     <div className="w-full h-[800px]">
//       <MapContainer
//         center={position}
//         zoom={4}
//         maxZoom={18}
//         zoomControl={false}
//         minZoom={3}
//         animate={true}
//         scrollWheelZoom={true}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <GeoJSON data={seg} style={setColor} />
//         <GeoJSON data={ecomp} pointToLayer={setIcon} />
//       </MapContainer>
//     </div>
//   );
// };

// export default TestGeoJSONMap;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

const TestGeoJSONMap = () => {
  const [markerData, setMarkerData] = useState([
    {
      id: 1,
      latitude: 23.8103,
      longitude: 90.4125,
      title: "Dhaka",
      description: "Capital city of Bangladesh",
    },
    {
      id: 5,
      latitude: 22.8456,
      longitude: 89.5403,
      title: "Khulna",
      description: "Important industrial and commercial city",
    },
    {
      id: 6,
      latitude: 22.4726,
      longitude: 89.5875,
      title: "Sundarbans",
      description: "Largest mangrove forest in the world",
    },
    {
      id: 7,
      latitude: 24.3735,
      longitude: 88.6012,
      title: "Rajshahi",
      description: "Known for its silk industry and mangoes",
    },
    {
      id: 9,
      latitude: 22.7019,
      longitude: 90.3492,
      title: "Barishal",
      description: "Divisional capital known for its rivers and bridges",
    },

    {
      id: 13,
      latitude: 25.7439,
      longitude: 89.2752,
      title: "Rangpur",
      description: "Known for its agricultural production and trade",
    },
    {
      id: 14,
      latitude: 25.3125,
      longitude: 89.2549,
      title: "Dinajpur",
      description: "Historical and cultural city with ancient ruins",
    },
    {
      id: 15,
      latitude: 24.7568,
      longitude: 90.4071,
      title: "Mymensingh",
      description: "Divisional city with a rich cultural heritage",
    },
  ]);

  // useEffect(() => {
  //   // Fetch marker data from your API
  //   axios.get('YOUR_API_URL')
  //     .then(response => {
  //       setMarkerData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching marker data:', error);
  //     });
  // }, []);

  return (
    <div style={{ borderRadius: "15px", overflow: "hidden" }}>
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "40vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerData.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
          >
            <Popup>
              <div>
                <h3>{marker.title}</h3>
                <p>{marker.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TestGeoJSONMap;

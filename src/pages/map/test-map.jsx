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
      id: 2,
      latitude: 23.9103,
      longitude: 90.5125,
      title: "Dhaka",
      description: "Capital city of Bangladesh",
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
    <div>
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "70vh" }}
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

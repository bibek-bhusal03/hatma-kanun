import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const dummyLocations = [
  {
    id: 1,
    title: "Kathmandu Durbar Square",
    description: "Historic square in Kathmandu, Nepal.",
    latitude: 27.7046,
    longitude: 85.3076,
    icon: "https://cdn-icons-png.flaticon.com/512/3448/3448615.png",
  },
  {
    id: 2,
    title: "Phewa Lake",
    description: "Beautiful freshwater lake in Pokhara.",
    latitude: 28.2096,
    longitude: 83.9856,
    icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  },
  {
    id: 3,
    title: "Lumbini",
    description: "Birthplace of Lord Buddha.",
    latitude: 27.4844,
    longitude: 83.2763,
    icon: "https://cdn-icons-png.flaticon.com/512/317/317217.png",
  },
  {
    id: 4,
    title: "Chitwan National Park",
    description: "Famous for wildlife safaris.",
    latitude: 27.5341,
    longitude: 84.4604,
    icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },
  {
    id: 5,
    title: "Bhaktapur Durbar Square",
    description: "Ancient city with rich culture.",
    latitude: 27.6727,
    longitude: 85.4274,
    icon: "https://cdn-icons-png.flaticon.com/512/3448/3448615.png",
  },
];

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [85.324, 27.7172], // Default Kathmandu
      zoom: 6,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Function to locate user
    const locateUser = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLng = pos.coords.longitude;
            const userLat = pos.coords.latitude;

            map.current.flyTo({ center: [userLng, userLat], zoom: 12 });

            new maplibregl.Marker({ color: "blue" })
              .setLngLat([userLng, userLat])
              .setPopup(new maplibregl.Popup().setText("You are here"))
              .addTo(map.current);
          },
          () => {
            alert("Unable to access location. Please enable GPS.");
          }
        );
      } else {
        alert("Geolocation not supported in this browser.");
      }
    };

    // Add custom "Locate Me" button
    class LocateControl {
      onAdd(mapInstance) {
        this._map = mapInstance;
        this._btn = document.createElement("button");
        this._btn.className =
          "maplibregl-ctrl-icon maplibregl-ctrl-locate bg-white rounded p-1 shadow";
        this._btn.type = "button";
        this._btn.title = "Locate Me";
        this._btn.innerHTML = "📍";
        this._btn.onclick = locateUser;

        const container = document.createElement("div");
        container.className = "maplibregl-ctrl maplibregl-ctrl-group";
        container.appendChild(this._btn);
        return container;
      }
      onRemove() {
        this._btn.parentNode.removeChild(this._btn);
        this._map = undefined;
      }
    }

    map.current.addControl(new LocateControl(), "top-left");

    //  Auto-locate on first load
    locateUser();

    //  Add dummy markers
    dummyLocations.forEach((location) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = `url(${location.icon})`;
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundSize = "cover";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";

      new maplibregl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(`
            <h3 class="font-bold">${location.title}</h3>
            <p>${location.description}</p>
          `)
        )
        .addTo(map.current);
    });
  }, []);

  return <div ref={mapContainer} className="w-full h-screen" />;
};

export default Map;

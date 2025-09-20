import React, { useEffect, useRef, useState } from "react";
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
  const userLocationRef = useRef(null);
  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    if (map.current) return;

    // Init map at Butwal, Janakinagar
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [83.4667, 27.7001],
      zoom: 13,
      attributionControl: false,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Try geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLng = pos.coords.longitude;
          const userLat = pos.coords.latitude;
          userLocationRef.current = [userLng, userLat];
          setForceUpdate((n) => n + 1);

          new maplibregl.Marker({ color: "blue" })
            .setLngLat([userLng, userLat])
            .setPopup(new maplibregl.Popup().setText("📍 You are here"))
            .addTo(map.current);

          map.current.flyTo({ center: [userLng, userLat], zoom: 14 });
        },
        (err) => {
          console.error("❌ Geolocation error:", err.code, err.message);
          alert("Location error: " + err.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("❌ Geolocation not supported in this browser.");
    }

    // Add Locate button
    class LocateControl {
      onAdd(mapInstance) {
        this._map = mapInstance;
        this._btn = document.createElement("button");
        this._btn.className =
          "maplibregl-ctrl-icon maplibregl-ctrl-locate bg-white rounded p-1 shadow";
        this._btn.type = "button";
        this._btn.title = "Locate Me";
        this._btn.innerHTML = "📍";
        this._btn.onclick = () => {
          if (userLocationRef.current) {
            mapInstance.flyTo({ center: userLocationRef.current, zoom: 14 });
          } else {
            alert("User location not found yet.");
          }
        };
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

    // Add dummy markers
    dummyLocations.forEach((location) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = `url(${location.icon})`;
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundSize = "cover";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";

      const popupContent = document.createElement("div");
      popupContent.innerHTML = `
        <div style="font-family: sans-serif; max-width: 200px;">
          <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 4px;">${location.title}</h3>
          <p style="font-size: 14px; color: #555; margin-bottom: 8px;">${location.description}</p>
          <button id="path-btn-${location.id}" 
            style="padding:6px 10px; background:#2563eb; color:#fff; border:none; border-radius:6px; cursor:pointer;">
            Show Path
          </button>
        </div>
      `;

      const popup = new maplibregl.Popup({ offset: 25 }).setDOMContent(
        popupContent
      );

      new maplibregl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup)
        .addTo(map.current);

      popup.on("open", () => {
        const btn = document.getElementById(`path-btn-${location.id}`);
        if (btn) {
          btn.onclick = () => {
            if (!userLocationRef.current) {
              alert("User location not available yet.");
              return;
            }
            const [userLng, userLat] = userLocationRef.current;
            const gmapsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${location.latitude},${location.longitude}`;
            window.open(gmapsUrl, "_blank");
          };
        }
      });
    });
  }, []);

  return <div ref={mapContainer} className="w-full h-screen" />;
};

export default Map;

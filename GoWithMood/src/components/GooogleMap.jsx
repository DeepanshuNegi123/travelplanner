import React, { useEffect, useRef } from "react"

const GoogleMap = ({ coordinates, destination, className = "" }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (mapRef.current && window.google) {
      // Initialize map
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 12,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ weight: "2.00" }]
          },
          {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [{ color: "#9c9c9c" }]
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#46bcec" }, { visibility: "on" }]
          }
        ]
      })

      // Add marker
      new window.google.maps.Marker({
        position: coordinates,
        map: mapInstanceRef.current,
        title: destination,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#3B82F6" stroke="white" stroke-width="4"/>
              <circle cx="20" cy="20" r="8" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20)
        }
      })

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: Inter, sans-serif;">
            <h3 style="margin: 0 0 5px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${destination}</h3>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Your selected destination</p>
          </div>
        `
      })

      // Show info window on marker click
      const marker = new window.google.maps.Marker({
        position: coordinates,
        map: mapInstanceRef.current,
        title: destination
      })

      marker.addListener("click", () => {
        infoWindow.open(mapInstanceRef.current, marker)
      })
    }
  }, [coordinates, destination])

  return (
    <div className={`w-full h-64 rounded-lg overflow-hidden ${className}`}>
      <div ref={mapRef} className="w-full h-full" />
      {!window.google && (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 mb-2">🗺️</div>
            <p className="text-gray-600">Map loading...</p>
            <p className="text-sm text-gray-500">Google Maps integration</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoogleMap

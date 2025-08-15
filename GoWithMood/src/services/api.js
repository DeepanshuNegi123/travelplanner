// API service configurations and functions
const API_BASE_URL = "https://api.example.com" // Replace with actual API base URL

// Country and destination APIs
export const countryAPI = {
  getCountries: async () => {
    const response = await fetch("https://restcountries.com/v3.1/all")
    return response.json()
  },

  getCountryByCode: async code => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    return response.json()
  }
}

// Hotel booking API (using a mock API structure)
export const hotelAPI = {
  searchHotels: async (destination, checkIn, checkOut, guests) => {
    // Mock API call - replace with actual hotel API
    const mockHotels = [
      {
        id: "1",
        name: "Grand Palace Hotel",
        rating: 4.8,
        price: 299,
        currency: "USD",
        image:
          "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
        amenities: ["WiFi", "Pool", "Spa", "Restaurant"],
        location: destination,
        description:
          "Luxury hotel in the heart of the city with stunning views and world-class amenities."
      },
      {
        id: "2",
        name: "Boutique City Inn",
        rating: 4.5,
        price: 189,
        currency: "USD",
        image:
          "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
        amenities: ["WiFi", "Breakfast", "Gym"],
        location: destination,
        description:
          "Modern boutique hotel with personalized service and contemporary design."
      },
      {
        id: "3",
        name: "Seaside Resort & Spa",
        rating: 4.9,
        price: 450,
        currency: "USD",
        image:
          "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800",
        amenities: ["WiFi", "Pool", "Spa", "Beach Access", "Restaurant"],
        location: destination,
        description:
          "Beachfront resort with private beach access and full-service spa."
      }
    ]

    return new Promise(resolve => {
      setTimeout(() => resolve(mockHotels), 1000)
    })
  },

  bookHotel: async (hotelId, bookingDetails) => {
    // Mock booking API
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve({
            bookingId: `BK${Date.now()}`,
            status: "confirmed",
            ...bookingDetails
          }),
        1500
      )
    })
  }
}

// Destination API
export const destinationAPI = {
  getDestinations: async (mood, budget) => {
    const destinations = {
      adventure: [
        {
          id: "1",
          name: "Queenstown, New Zealand",
          country: "NZ",
          countryName: "New Zealand",
          image:
            "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200",
          description:
            "Adventure capital with bungee jumping, skydiving, and stunning landscapes.",
          estimatedCost: 2500,
          activities: ["Bungee Jumping", "Skydiving", "Hiking", "Jet Boating"],
          bestTime: "December - February",
          coordinates: { lat: -45.0312, lng: 168.6626 }
        },
        {
          id: "2",
          name: "Interlaken, Switzerland",
          country: "CH",
          countryName: "Switzerland",
          image:
            "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1200",
          description:
            "Alpine adventure hub with paragliding, skiing, and mountain climbing.",
          estimatedCost: 3200,
          activities: ["Paragliding", "Skiing", "Mountain Climbing", "Hiking"],
          bestTime: "June - September",
          coordinates: { lat: 46.6863, lng: 7.8632 }
        }
      ],
      relaxation: [
        {
          id: "3",
          name: "Maldives",
          country: "MV",
          countryName: "Maldives",
          image:
            "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1200",
          description:
            "Tropical paradise with overwater bungalows and pristine beaches.",
          estimatedCost: 4500,
          activities: [
            "Snorkeling",
            "Spa Treatments",
            "Beach Relaxation",
            "Sunset Cruises"
          ],
          bestTime: "November - April",
          coordinates: { lat: 3.2028, lng: 73.2207 }
        },
        {
          id: "4",
          name: "Santorini, Greece",
          country: "GR",
          countryName: "Greece",
          image:
            "https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=1200",
          description:
            "Stunning sunsets, white-washed buildings, and peaceful atmosphere.",
          estimatedCost: 2800,
          activities: [
            "Wine Tasting",
            "Sunset Viewing",
            "Beach Relaxation",
            "Spa"
          ],
          bestTime: "April - October",
          coordinates: { lat: 36.3932, lng: 25.4615 }
        }
      ],
      romance: [
        {
          id: "5",
          name: "Paris, France",
          country: "FR",
          countryName: "France",
          image:
            "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
          description:
            "City of love with romantic cafes, art, and iconic landmarks.",
          estimatedCost: 3500,
          activities: [
            "Seine River Cruise",
            "Eiffel Tower",
            "Louvre Museum",
            "Romantic Dinners"
          ],
          bestTime: "April - June, September - October",
          coordinates: { lat: 48.8566, lng: 2.3522 }
        },
        {
          id: "6",
          name: "Venice, Italy",
          country: "IT",
          countryName: "Italy",
          image:
            "https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=1200",
          description:
            "Romantic canals, gondola rides, and historic architecture.",
          estimatedCost: 2900,
          activities: [
            "Gondola Rides",
            "St. Marks Square",
            "Romantic Dinners",
            "Art Galleries"
          ],
          bestTime: "April - June, September - November",
          coordinates: { lat: 45.4408, lng: 12.3155 }
        }
      ],
      friends: [
        {
          id: "7",
          name: "Tokyo, Japan",
          country: "JP",
          countryName: "Japan",
          image:
            "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
          description:
            "Vibrant city with amazing food, nightlife, and unique culture.",
          estimatedCost: 3800,
          activities: ["Karaoke", "Street Food Tours", "Nightlife", "Shopping"],
          bestTime: "March - May, September - November",
          coordinates: { lat: 35.6762, lng: 139.6503 }
        },
        {
          id: "8",
          name: "Barcelona, Spain",
          country: "ES",
          countryName: "Spain",
          image:
            "https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1200",
          description:
            "Lively city with great nightlife, beaches, and architecture.",
          estimatedCost: 2400,
          activities: [
            "Beach Parties",
            "Tapas Tours",
            "Nightlife",
            "Architecture Tours"
          ],
          bestTime: "May - September",
          coordinates: { lat: 41.3851, lng: 2.1734 }
        }
      ]
    }

    return destinations[mood] || []
  }
}

// VR Content API
export const vrAPI = {
  getVRContent: async destinationId => {
    const vrContent = {
      "1": {
        videos: [
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
        ],
        images360: [
          "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        description:
          "Experience Queenstown in 360° - from thrilling adventures to serene landscapes."
      },
      "3": {
        videos: [
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        ],
        images360: [
          "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        description:
          "Immerse yourself in the crystal-clear waters and luxury of the Maldives."
      }
    }

    return (
      vrContent[destinationId] || {
        videos: [],
        images360: [],
        description: "VR content coming soon for this destination."
      }
    )
  }
}

// Google Maps integration
export const mapsAPI = {
  initializeMap: (elementId, coordinates) => {
    if (typeof google !== "undefined") {
      const map = new google.maps.Map(document.getElementById(elementId), {
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
          }
        ]
      })

      new google.maps.Marker({
        position: coordinates,
        map: map,
        title: "Destination"
      })

      return map
    }
  }
}


export   const  aiservices = {

  getAIdestinations : async (prompt)=>{
    // api of destinations fetching 

    return {
      destinations :
      [
        {
          place : "Tokyo, Japan",
          description : "Vibrant city with amazing food, nightlife, and unique culture.",
          image : "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
          activities : ["Karaoke", "Street Food Tours", "Nightlife", "Shopping"],
          bestTime : "March - May, September - November",
          coordinates : { lat: 35.6762, lng: 139.6503 }
        }
      ]
    }
  }

}
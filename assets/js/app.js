

// map init
document.addEventListener("DOMContentLoaded", function () {
  mouseCursorInit();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showNearestSalons, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function mouseCursorInit() {
  // mouse cursor init 
  const cursor = document.querySelector('.circular-cursor');
  const radius = 40;
  let angle = 0;
  document.addEventListener('mousemove', (e) => {
    // Calculate circular path coordinates
    const offsetX = radius * Math.cos(angle);
    const offsetY = radius * Math.sin(angle);

    // Set the position of the cursor element
    cursor.style.transform = `translate(${e.pageX + offsetX}px, ${e.pageY + offsetY}px)`;

    // Increment angle for continuous circular movement
    angle += 0.1;
  });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function showNearestSalons(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  // Static example salon data
  initMap(latitude, longitude, [
    {
      "id": 1,
      "salon_name": "Gleichner-Feil",
      "salon_owner_number": "+1-914-881-5723",
      "salon_address": "5540 Norris Tunnel Suite 960\nSouth Chanelton, MA 67163",
      "latitude": "23.7725671",
      "longitude": "90.4408913",
      "email": "waino30@example.com",
      "airconditioning": "1",
      "open_time": "14:04:50",
      "close_time": "04:39:37",
      "open_days": "Mon-Fri",
      "open_close_status": 1,
      "number_of_staff": "37",
      "salon_image": "https://via.placeholder.com/640x480.png/007700?text=business+salon+nisi",
      "created_at": "2024-10-26T08:33:51.000000Z",
      "updated_at": "2024-10-26T08:33:51.000000Z",
      "distance": 0.65
    }
  ]);
}

function initMap(userLat, userLng, salons) {
  // Define your map style here
  const mapStyle = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#000000"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#000000"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        }
      ]
    }
  ];

  // Initialize the map with the user's location and custom style
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: userLat, lng: userLng },
    zoom: 12,
    gestureHandling: "greedy",
    styles: mapStyle,
  });

  // User's location marker
  var userMarker = new google.maps.Marker({
    position: { lat: userLat, lng: userLng },
    map: map,
    title: "You are here!",
    icon: {
      url: "assets/images/near.png",
      scaledSize: new google.maps.Size(80, 80)
    }
  });

  // Add markers for each nearest salon with custom icon
  salons.forEach(function (salon) {
    var salonLat = parseFloat(salon.latitude);
    var salonLng = parseFloat(salon.longitude);

    if (!isNaN(salonLat) && !isNaN(salonLng)) {
      var marker = new google.maps.Marker({
        position: { lat: salonLat, lng: salonLng },
        map: map,
        title: salon.salon_name,
        icon: {
          url: "assets/images/shop.png",
          scaledSize: new google.maps.Size(40, 40)
        }
      });

      // Info window for each salon marker
      var infoWindow = new google.maps.InfoWindow({
        content: `
                <div class="info-window-container">
                  <h3 class="info-window-header">Salon Information</h3>
                  <div class="info-window-content">
                    <div>
                      <img src="${salon.salon_image}" alt="${salon.salon_name}" class="info-window-image">
                    </div>
                    <div>
                      <h4 class="info-window-details">${salon.salon_name}</h4>
                      <p class="info-window-address">${salon.salon_address}</p>
                      <a href="/salon-details/my-selected-salon?salon_id=${salon.id}" class="info-window-link">View Details</a>
                    </div>
                  </div>
                </div>
              `
      });

      // Show info window when marker is clicked
      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    } else {
      console.error("Invalid latitude or longitude for salon:", salon.salon_name);
    }
  });
}
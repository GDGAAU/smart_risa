const fetch = require('node-fetch');

const apiKey = "pk.eyJ1IjoiaGVub2NrdCIsImEiOiJjbTY5OTdwcm4wODVjMmtzZTVlODRyMWFxIn0.Dj3dhnLSVFdns1Od2ziC7g";
const startLat = 9.03;
const startLng = 38.74;
const destLat = 9.03;  // Destination latitude
const destLng = 38.75; // Destination longitude

const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${destLng},${destLat}?access_token=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Output data to console
  })
  .catch(error => {
    console.error("Error fetching data: ", error);
  });

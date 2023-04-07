const CENTRES_URL = "https://isro.vercel.app/api/centres";
const SPACECRAFTS_URL = "https://isro.vercel.app/api/spacecrafts";
const ROCKETS_URL = "https://isro.vercel.app/api/launchers";
const CUSTOMER_SATELLITES_URL =
  "https://isro.vercel.app/api/customer_satellites";

const stateInput = document.getElementById("state-input");
const searchBtn = document.getElementById("search-btn");
const centersList = document.getElementById("centers-list");

const spacecraftsList = document.getElementById("spacecrafts-list");
const rocketsList = document.getElementById("rockets-list");

const countryInput = document.getElementById("country-input");
const searchSatellitesBtn = document.getElementById("search-satellites-btn");
const customerSatellitesList = document.getElementById(
  "customer-satellites-list"
);

searchBtn.addEventListener("click", searchCentersByState);
searchSatellitesBtn.addEventListener(
  "click",
  searchCustomerSatellitesByCountry
);

fetchSpacecrafts();
fetchRockets();

async function searchCentersByState() {
  const state = stateInput.value.trim().toLowerCase();
  if (!state) {
    alert("Please enter a state name");
    return;
  }
  try {
    const centersJSON = await fetch(CENTRES_URL);
    const centersData = await centersJSON.json();
    if (centersData && centersData.length > 0) {
      const filteredCenters = centersData.filter((center) =>
        center.location.state.toLowerCase().includes(state)
      );
      displayCenters(filteredCenters);
    } else {
      console.error("Error fetching centers data");
      alert("Error fetching centers data");
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching centers data");
  }
}

async function fetchSpacecrafts() {
  try {
    const response = await fetch(SPACECRAFTS_URL);
    const data = await response.json();
    if (data && data.spacecrafts) {
      displaySpacecrafts(data.spacecrafts);
    } else {
      console.error("Error fetching spacecrafts data");
      alert("Error fetching spacecrafts data");
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching spacecrafts data");
  }
}

async function fetchRockets() {
  try {
    const response = await fetch(ROCKETS_URL);
    const data = await response.json();
    if (data && data.launchers) {
      displayRockets(data.launchers);
    } else {
      console.error("Error fetching rockets data");
      alert("Error fetching rockets data");
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching rockets data");
  }
}

async function searchCustomerSatellitesByCountry() {
  const country = countryInput.value.trim().toLowerCase();
  if (!country) {
    alert("Please enter a country name");
    return;
  }
  try {
    const response = await fetch(CUSTOMER_SATELLITES_URL);
    const data = await response.json();
    if (data && data.satellites) {
      const filteredSatellites = data.satellites.filter((satellite) =>
        satellite.country.toLowerCase().includes(country)
      );
      displayCustomerSatellites(filteredSatellites);
    } else {
      console.error("Error fetching customer satellites data");
      alert("Error fetching customer satellites data");
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching customer satellites data");
  }
}

function displayCenters(centers) {
  let html = "";
  if (centers.length === 0) {
    html = "<p>No centers found in the entered state.</p>";
  } else {
    centers.forEach((center) => {
      html += `
        <div class="center">
          <h3>${center.name}</h3>
          <p>${center.location.address}</p>
          <p>${center.location.city}, ${center.location.state} - ${center.location.pincode}</p>
        </div>
      `;
    });
  }
  centersList.innerHTML = html;
}

function displaySpacecrafts(spacecrafts) {
  let html = "";
  spacecrafts.forEach((spacecraft) => {
    html += `option value="${spacecraft.id}">${spacecraft.name}</option`;
  });
  spacecraftsList.innerHTML = html;
}

function displayRockets(rockets) {
  let html = "";
  rockets.forEach((rocket) => {
    html += `<option value="${rocket.id}">${rocket.name}</option>`;
  });
  rocketsList.innerHTML = html;
}

function displayCustomerSatellites(satellites) {
  let html = "";
  if (satellites.length === 0) {
    html = "<p>No customer satellites found for the entered country.</p>";
  } else {
    satellites.forEach((satellite) => {
      html += `
        <div class="satellite">
          {" "}
          <h3>${satellite.name}</h3> <p>Country: ${satellite.country}</p>{" "}
          <p>Operator: ${satellite.operator}</p>{" "}
        </div>
      `;
    });
  }
  customerSatellitesList.innerHTML = html;
}

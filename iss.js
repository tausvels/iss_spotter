const request = require("request");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
//MY FUNC IS THE CALLBACK FUNCTION
const fetchMyIP = function(myFunc) {
  // use request to fetch IP address from JSON API
  let endpoint = `https://api.ipify.org?format=json`;
  request(endpoint, (error, response, body)=>{
    if (error) {
      myFunc(error);
    } else if (response.statusCode !== 200) {
      myFunc(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
    } else {
      const ip = JSON.parse(body).ip; // returns the ip property of body.
      myFunc(null, ip, null);
    }
  });
};

const fetchCoordsByIP = function(ip, fetchCoordsByIPCallback) {
  const endpoint = `https://ipvigilante.com/${ip}`;
  request(endpoint, (error, response, body) => {
    if (error) {
      fetchCoordsByIPCallback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      fetchCoordsByIPCallback((Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null));
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    return fetchCoordsByIPCallback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, nextPasses) {
  const endpoint = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(endpoint, (error, response, body) => {
    if (error) {
      nextPasses(error);
      return;
    }
    if (response.statusCode !== 200) {
      nextPasses(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);      return;
    }
    const data = JSON.parse(body);
    const passes = data.response;
    nextPasses(null, passes);
  });
};

const nextISSTimesForMyLocation = function(nextISSTimesForMyLocationCallback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return nextISSTimesForMyLocationCallback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return nextISSTimesForMyLocationCallback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return nextISSTimesForMyLocationCallback(error, null);
        }

        nextISSTimesForMyLocationCallback(null, nextPasses);
      });
    });
  });
};

module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};

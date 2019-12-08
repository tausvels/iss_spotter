console.clear();
const request = require('request-promise-native');
//const {fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes} = require("./iss_promised");
const { nextISSTimesForMyLocation } = require ("./iss_promised");

const printPassTimes = function(passTimes) { // returns an array of objects containing 'risetime' and 'duration' props.
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
.then((passTimes) => {
    printPassTimes(passTimes)
})
.catch((error) => {
    console.log(`Oooppss...Error!! ${error.message}.`)
})
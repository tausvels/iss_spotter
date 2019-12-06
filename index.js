// index.js
//const { fetchMyIP } = require('./iss');
//const { fetchCoordsByIP } = require("./iss");
//const { fetchISSFlyOverTimes } = require("./iss");
const { nextISSTimesForMyLocation } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//     console.log(`It worked! Returned IP: `, ip);
//     fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//       console.log(`Did not worK: `, error);
//       return
//     } else {
//       console.log(coordinates);
//       fetchISSFlyOverTimes (coordinates, (error, data) => {
//         if(error){
//           console.log(`Did not work: `, error)
//           return
//         }else{
//           console.log(data)
//         }
//       })
//     }
//   });
// });

const printPassTimes = function(passTimes) { // returns an array of objects containing 'risetime' and 'duration' props.
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
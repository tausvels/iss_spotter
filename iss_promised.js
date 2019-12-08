console.clear();
const request = require('request-promise-native');

const fetchMyIp = function (){
    const endpoint = `https://api.ipify.org?format=json`;
    const body = (request(endpoint)) // returns a promise object
    return body;
};
const fetchCoordsByIP = function(body) {
    const ip = JSON.parse(body).ip;
    return request(`https://ipvigilante.com/json/${ip}`);
};
const fetchISSFlyOverTimes = function (body){
    const latitude = JSON.parse(body).data.latitude;
    const longitude = JSON.parse(body).data.latitude;
    const endpoint = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
    return request (endpoint);
}
const nextISSTimesForMyLocation = function (){
   return fetchMyIp()
            .then(fetchCoordsByIP)
            .then(fetchISSFlyOverTimes)
            .then((data) => {
                const {response} = JSON.parse(data);
                return response;
            })
}

//module.exports = {fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes};
module.exports = { nextISSTimesForMyLocation };

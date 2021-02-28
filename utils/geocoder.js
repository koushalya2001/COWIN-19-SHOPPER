const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httpAdapter:'https',
  // Optional depending on the providers
  apiKey: 'V9W0ALcePSCONcoxO9AInSiljIagwGmO', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

module.exports.geocoder = NodeGeocoder(options);

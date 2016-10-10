let jsonAPi = require('jsonapi-datastore');

var store = new jsonAPi.JsonApiDataStore();
var storeTeam = new jsonAPi.JsonApiDataStore();

exports.parseData = function(data){
  store.sync(data);
  return store;
  };

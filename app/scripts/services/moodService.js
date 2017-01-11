(function () {
  'use strict';

  angular
    .module('app')
    .factory('moodService', moodService);
  function moodService($http) {
    var api = {};

    api.getMatches = getMatches;
    api.getGiphy = getGiphy;

    var apiUrl = "https://dota-mood.azurewebsites.net"
    var giphyUrl = "http://api.giphy.com/v1/gifs"
    var giphyKey = "&api_key=dc6zaTOxFJmzC"
    //"url": "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC",
    function getMatches() {
      return $http.get(apiUrl + '/score').then(handleSuccess, handleError('Error getting all users'));
    }
    function getGiphy(search) {
      return $http.get(giphyUrl + '/search?q=' + search + giphyKey).then(handleSuccess, handleError('Error getting all users'));
    }

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function () {
        return { success: false, message: error };
      };
    }
    return api;
    // return mood;

  }
})();


    // var mood = new Dexie('gtfs');


    // var gtfs = [
    //   'calendar',
    //   'calendar_dates',
    //   'stop_times',
    //   'stops',
    //   'trips'
    // ];



    // var db = mood;

    // db.version(1).stores({
    //   'calendar': "++id,service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date",
    //   'calendar_dates': "++id,service_id,date,exception_type",
    //   'stop_times': "++id,trip_id,arrival_time,departure_time,stop_id,stop_sequence,pickup_type,drop_off_type",
    //   'stops': "++id,stop_id,stop_code,stop_name,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station,platform_code,wheelchair_boarding",
    //   'trips': "++id,route_id,service_id,trip_id,trip_headsign,trip_short_name,direction_id,shape_id,wheelchair_accessible,bikes_allowed"
    // });

    // // Populate from AJAX:
    // db.on('ready', function () {
    //   return db.calendar.count(function (count) {
    //     if (count > 0) {
    //       console.log("Already populated, 'gtfs' is already created at this domain.");
    //     } else {
    //       console.log("Database is empty. Populating from ajax call...");
    //       return Dexie.Promise.all(gtfs.map(name => new Dexie.Promise((resolve, reject) => {
    //         $.ajax('gtfs/' + name + '.txt', {
    //           dataType: 'text'
    //         }).then(resolve, reject);
    //       }).then(data => {
    //         console.log("Got ajax response for " + name);
    //         return parseCSV(data);
    //       }).then(res => {
    //         console.log("Bulk putting " + res.length + " " + name + " records into database");
    //         return db[name].bulkPut(res);
    //       }).then(() => {
    //         console.log("Done importing " + name);
    //       }))).then(() => {
    //         console.log("All files successfully imported");
    //       }).catch(err => {
    //         console.error("Error importing data: " + (err.stack || err));
    //         throw err;
    //       });
    //     }
    //   });
    // });
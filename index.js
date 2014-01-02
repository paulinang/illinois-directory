var http = require('http')
  , concat = require('concat-stream')
  , nameRegex
  , regStart
  , regEnd;

regStart = '<h4 class="ws-ds-name detail-title">';
regEnd = '<\/h4>';
nameRegex = new RegExp(regStart + '([^<>]+?)' + regEnd, 'gi');

module.exports = function (netID, cb) {

  var url = 'http://illinois.edu/ds/search?search='+netID;

  http.get(url, function (response) {

    response.on('error', function (e) {
      cb(e);
    });

    response.pipe(concat(function (data) {
      var matches = data.toString().match(nameRegex)
        , fullname;

      if(matches) {
        fullname = matches[0].substring(regStart.length,
          matches[0].length - regEnd.length).split(' ');

        cb(null, {
          firstname: fullname[0]
        , lastname: fullname.pop()
        });
      }
      else {
        cb(new Error('The netID was not found'));
      }
    }));
  });
};

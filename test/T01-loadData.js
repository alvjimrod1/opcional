/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var fs = require("fs");
var path = require("path");

describe('Data is loaded', function() {
   it('should show some contacts', function() {
      browser
         .get('https://sos1718-09-brr-sos171811brr.c9users.io/spanUnivStats/')
         .then(function() {
            element.all(by.repeater('stat in stats'))
               .then(function(stats) {
                  expect(stats.length).toBeGreaterThan(0);
               });

         });

   });
});

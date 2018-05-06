/*global expect*/
/*global browser*/
/*global element*/
/*global by*/
/*global protractor*/

var fs = require("fs");
var path = require("path");

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

describe('Add stat', function() {
    it('should add a new stat', function() {
        browser
            .get('https://sos171809rar-sos171809rar.c9users.io/openSourceContests/#!/')
            .then(function() {
                    element.all(by.repeater('contest in contest')).then(function(initialStats) {

                        element(by.model('newContest.project')).sendKeys(1);
                        element(by.model('newContest.university')).sendKeys(1);
                        element(by.model('newContest.year')).sendKeys(1);
                        element(by.model('newContest.autCommunity')).sendKeys(1);
                        element(by.model('newContest.city')).sendKeys(1);
                        element(by.model('newContest.description')).sendKeys(1);
                        element(by.model('newContest.team')).sendKeys(1);

                        element(by.buttonText('Add')).click().then(function() {
                                    expect(0).toBeGreaterThanOrEqual(initialStats.length);
                        });
                    
                });
            });
    });
});

/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var fs = require("fs");
var path = require("path");

describe('Add stat', function() {
    it('should add a new stat', function() {
        browser
            .get('https://sos1718-09-brr-sos171811brr.c9users.io/spanUnivStats/')
            .then(function() {
                element.all(by.repeater('stat in stats'))
                    .then(function(initialStats) {
                        
                        element(by.model('newStat.autCommunity')).sendKeys(Math.random());
                        element(by.model('newStat.year')).sendKeys(Math.random());
                        element(by.model('newStat.enrolledNumber')).sendKeys(1);
                        element(by.model('newStat.degree')).sendKeys(1);
                        element(by.model('newStat.master')).sendKeys(1);
                        element(by.model('newStat.firstSecondCycle')).sendKeys(1);
                        
                        element(by.buttonText('ADD')).click().then(function(){
                            element.all(by.repeater('stat in stats')).then(function(stats){
                                expect(stats.length).toBeGreaterThanOrEqual(initialStats.length);
                            });
                            
                        });
                        
                    });

            });

    });
});

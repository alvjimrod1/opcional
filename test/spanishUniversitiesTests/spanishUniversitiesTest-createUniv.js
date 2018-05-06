/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

describe('Add an univ', function() {
    it('should add a new university', function() {
        browser
            .get('https://sos1718-09-ajr-sos171809ajr.c9users.io/spanishUniversities/')
            .then(function() {
                element
                    .all(by.repeater('univ in univs'))
                    .then(function(initialUnivs) {
             //           browser.driver.sleep(2000);

                        element(by.model('newUniv.autCommunity')).sendKeys("Andalucia");
                        element(by.model('newUniv.yearFund')).sendKeys("1924");
                        element(by.model('newUniv.headquar')).sendKeys("Sevilla");
                        element(by.model('newUniv.type')).sendKeys("publica");
                        element(by.model('newUniv.nameUniversity')).sendKeys("Universidad de prueba");



                        element(by.buttonText('Add')).click().then(function() {
                            element.all(by.repeater('univ in univs')).then(function(univs) {
                                expect(univs.length).toBeGreaterThanOrEqual(initialUnivs.length);
                            });

                        });

                    });

            });

    });
});

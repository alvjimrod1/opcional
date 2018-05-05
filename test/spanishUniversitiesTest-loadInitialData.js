/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

describe('Data is loaded', function() {
    it('should show some spanish universities', function() {
        browser
            .get('https://sos1718-09-ajr-sos171809ajr.c9users.io/spanishUniversities/')
            .then(function() {
                element
                    .all(by.repeater('univ in univs'))
                    .then(function(univs) {
                        expect(univs.length).toBeGreaterThan(4);
                    });

            });

    });
});

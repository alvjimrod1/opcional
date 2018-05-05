exports.config = {

    seleniumAddress: 'http://localhost:8910', //dirección del navegador al que (protractor) le va a lanzar las pruebas (phantomjs)

    specs: ['T01-loadData.js', 'T02-createStat.js',
        'spanishUniversitiesTest-loadInitialData.js', 'spanishUniversitiesTest-createUniv.js'
    ], // array con los test a lanzar

    capabilities: { // tipo de navegador que voy a usar
        'browserName': 'phantomjs'
    }
};

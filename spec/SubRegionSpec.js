'use strict';

var fs = require('fs');

var jsonFile = __dirname + '/../dist/geographical-sub-regions.json';

xdescribe('geographical-sub-regions.json', function() {
	var data = require( jsonFile );

	it('is an array', function() {
		expect( typeof data ).toBe('object');
	});

	it('has least 1 sub-region', function () {
		expect( data.length ).toBeGreaterThan( 0 );
	});

	describe('each sub-region', function() {

		var count = 1;

		data.forEach( function( item ) {

			describe('Sub-regions: ' + count + ' (' + item.name + ')', function() {
				it('is an object', function() {
					expect( typeof item ).toBe('object');
				});

				it('has a name', function() {
					expect( item.name ).toBeDefined();
				});

				it('has a numericID', function() {
					expect( item.numericID ).toBeDefined();
				});
			});

			count++;

		});

	});

});

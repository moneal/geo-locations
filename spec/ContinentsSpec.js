'use strict';

var fs = require('fs');

function regionTest() {
	var jsonFile = __dirname + '/../dist/geographical-regions.json';

	xdescribe('geographical-regions.json', function() {
		var data = require( jsonFile );
		
		it('is an array', function() {
			expect( typeof data ).toBe('object');
		});

		it('has least 1 region', function () {
			expect( data.length ).toBeGreaterThan( 0 );
		});


		describe('each region', function() {

			var count = 1;

			data.forEach( function( item ) {

				describe('Regions: ' + count + ' (' + item.name + ')', function() {
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
}

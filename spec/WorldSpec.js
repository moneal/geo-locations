'use strict';

var fs = require('fs');
var fileBase = __dirname + '/../dist';
// var jsonFile = __dirname + '/../dist/worlds.json';
//
function countriesTest( fileBase ) {
	var jsonFile = fileBase + '/countries.json';
	//console.log( jsonFile );

	describe('countries.json', function() {
		var data = require( jsonFile );
		console.log(data);
		it('is an array', function() {
			expect( typeof data ).toBe('object');
		});

		it('has least 1 country', function () {
			expect( data.length ).toBeGreaterThan( 0 );
		});


		xdescribe('each country', function() {

			var count = 1;

			data.forEach( function( item ) {

				describe('Sub Regions: ' + count + ' (' + item.name + ')', function() {

					var subRegionBase = '';
					it('is an object', function() {
						expect( typeof item ).toBe('object');
					});

					it('has a name', function() {
						expect( item.name ).toBeDefined();
					});

					it('has a numericId', function() {
						expect( item.numericId ).toBeDefined();
					});

					xit('has a parent', function() {
						expect( item.parent ).toBeDefined();
					});

					it('has a sub folder', function() {
						subRegionBase = fileBase + '/' + item.numericId;
						//console.log( subRegionBase );
						expect( fs.existsSync( subRegionBase ) ).toBe(true);
						if ( ! fs.existsSync( subRegionBase ) ) {
							fs.mkdirSync( subRegionBase );
						}
					});

					it('has countries file', function() {
						
						expect( fs.existsSync( fileBase + '/' + item.numericId + '/' + 'countries.json' ) ).toBe(true);
						if ( ! fs.existsSync( fileBase + '/' + item.numericId + '/' + 'countries.json' ) ) {
							fs.writeFile( fileBase + '/' + item.numericId + '/' + 'countries.json', '[\n\t{\n\t\t"char2code":""\n\t}\n]');
						}
					});
	
					countriesTest( fileBase + '/' + item.numericId );
				});

				count++;

			});

		});

	});
}

function subRegionTest( fileBase ) {
	var jsonFile = fileBase + '/sub-regions.json';
	//console.log( jsonFile );

	describe('sub-regions.json', function() {
		var data = require( jsonFile );

		it('is an array', function() {
			expect( typeof data ).toBe('object');
		});

		it('has least 1 sub-region', function () {
			expect( data.length ).toBeGreaterThan( 0 );
		});


		describe('each sub region', function() {

			var count = 1;

			data.forEach( function( item ) {

				describe('Sub Regions: ' + count + ' (' + item.name + ')', function() {

					var subRegionBase = '';
					it('is an object', function() {
						expect( typeof item ).toBe('object');
					});

					it('has a name', function() {
						expect( item.name ).toBeDefined();
					});

					it('has a numericId', function() {
						expect( item.numericId ).toBeDefined();
					});

					xit('has a parent', function() {
						expect( item.parent ).toBeDefined();
					});

					it('has a sub folder', function() {
						subRegionBase = fileBase + '/' + item.numericId;
						//console.log( subRegionBase );
						expect( fs.existsSync( subRegionBase ) ).toBe(true);
						if ( ! fs.existsSync( subRegionBase ) ) {
							fs.mkdirSync( subRegionBase );
						}
					});

					it('has countries file', function() {
						
						expect( fs.existsSync( fileBase + '/' + item.numericId + '/' + 'countries.json' ) ).toBe(true);
						if ( ! fs.existsSync( fileBase + '/' + item.numericId + '/' + 'countries.json' ) ) {
							fs.writeFile( fileBase + '/' + item.numericId + '/' + 'countries.json', '[\n\t{\n\t\t"char2code":""\n\t}\n]');
						}
					});
	
					countriesTest( fileBase + '/' + item.numericId );
				});

				count++;

			});

		});

	});
}



function regionTest( fileBase ) {
	var jsonFile = fileBase + '/geographical-regions.json';

	describe('geographical-regions.json', function() {
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
					var subRegionBase = '';
					it('is an object', function() {
						expect( typeof item ).toBe('object');
					});

					it('has a name', function() {
						expect( item.name ).toBeDefined();
					});

					it('has a numericId', function() {
						expect( item.numericId ).toBeDefined();
					});

					xit('has a parent', function() {
						expect( item.parent ).toBeDefined();
					});

					it('has a sub folder', function() {
						subRegionBase = fileBase + '/' + item.numericId;
						//console.log( regionBase );
						expect( fs.existsSync( subRegionBase ) ).toBe(true);
					});

					it('has sub regions file', function() {
						expect( fs.existsSync( subRegionBase + '/' + 'sub-regions.json' ) ).toBe(true);
					});
	
					subRegionTest( fileBase + '/' + item.numericId );
				});

				count++;

			});

		});

	});
}



describe('worlds.json', function() {
	var data = require( fileBase + '/worlds.json' );

	it('is an array', function() {
		expect( typeof data ).toBe('object');
	});

	it('has at least 1 item', function () {
		expect( data.length ).toBeGreaterThan( 0 );
	});

	describe('each world', function() {

		var count = 1;

		data.forEach( function( item ) {

			describe('World: ' + count + ' (' + item.name + ')', function() {
				it('is an object', function() {
					expect( typeof item ).toBe('object');
				});

				it('has a name', function() {
					expect( item.name ).toBeDefined();
				});

				it('has a numericID', function() {
					expect( item.numericId ).toBeDefined();
				});

				it('has a sub folder', function() {
					fileBase = fileBase + '/' + item.numericId;
					//console.log( fileBase );
					expect( fs.existsSync( fileBase ) ).toBe(true);
				});

				it('has regions file', function() {
					expect( fs.existsSync( fileBase + '/' + 'geographical-regions.json' ) ).toBe(true);
				});

				xit('has sub regions file', function() {
					expect( fs.existsSync( fileBase + '/' + 'geographical-regions.json' ) ).toBe(true);
				});

				regionTest( fileBase + '/' + item.numericId  );

			});

			count++;

		});

	});

});

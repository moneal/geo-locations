/*
 * Build the all json file with every detail
 */
var fs = require('fs');

var outFile		= __dirname + '/../dist/all.json';
var srcDir		= __dirname + '/../src';
var worlds		= require( srcDir + '/worlds.json' );

// Load data for each world
// BTW this is not going to work well if other words are not organized the same.
for ( var i=0; i < worlds.length; i++ ) {
	var worldId = worlds[i].numericId;
	var worldPath = srcDir + '/' + worldId;
	if (fs.existsSync( worldPath + '/geographical-regions.json')) {
		// Do something
		var regions = require(  worldPath + '/geographical-regions.json' );
		worlds[i].regions = regions;
		
		// For each each load sub regions
		for ( var r=0; r < regions.length; r++) {
			var regionId = regions[r].numericId;
			var regionPath = worldPath + '/' + regionId;
			if (fs.existsSync( regionPath + '/sub-regions.json')) {
				var subRegions = require(  regionPath + '/sub-regions.json' );
				worlds[i].regions[r].subRegions = subRegions;

				for ( var sr=0; sr < subRegions.length; sr++) {
					worlds[i].regions[r].subRegions[sr].parent = regionId;

					var subRegionId = subRegions[sr].numericId;
					var subRegionPath = regionPath + '/' + subRegionId;
					if (fs.existsSync( subRegionPath + '/countries.json')) {
						var countries = require(  subRegionPath + '/countries.json' );
						worlds[i].regions[r].subRegions[sr].countries = countries;
						
						
						for ( var c=0; c < countries.length; c++) {
							worlds[i].regions[r].subRegions[sr].countries[c].parent = subRegionId;
						}
					}
				}
				
			} else {
				console.info('No sub regions exist for', regions[r].name);
			}
		}
	} else {
		console.info('No regions exist for', worlds[i].name);
	}

}
console.log( require('util').inspect( worlds, true, 10 ) );

fs.writeFile( outFile, JSON.stringify(worlds, null, 4), function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log('JSON saved to ' + outFile);
	}
}); 

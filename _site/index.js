

// STATIC FILES IN REPO

	// 	map.json (ADM0)

	// 	countryIndex.json

		// country name
		// retail price
		// retail price index
		// wholesale price
		// wholesale price opacity index

// SCRIPTING

	// 	load d3

	// 	load topoJSON

	// 	assign variable projection with d3.geo.mercator()
	// 		manipulate projection if we need to

	// 	assign variable path with path generator using mercator projection

	// 	call d3.json and pass it map.json

	// 		create svg path element
	// 		bind the topoJSON data to the path as geoJSON subunits
	// 		set class of subunits to subunit + d.id 
	// 		set d attribute to the path (a string which contains a series of path descriptions)

		
// STYLING

	// 	static heading

	// 	retail and wholesale tabs

	// 	.retail has opactiy === countryIndex.[...].retailOpacity
	// 	.wholesale has opactiy === countryIndex.[...].wholesaleOpacity

	// 	toggle class for hover

	// 	name and price appears on hover





d3.json("newer.json", function (error, map) {
	  
	  	var width = window.innerWidth,
		    height = 500,
			svg = d3.select("div#svgContainer").append("svg")
			    .attr("width", width)
			    .attr("height", height);

	  	if (error) return console.error(error);

	  	// MAPPING

		var subunits = topojson.feature(map, map.objects.new),
			projection = d3.geo.mercator()
				.scale(150)
				.translate([width / 2, height / 1.65]),
			path = d3.geo.path()
	    		.projection(projection);

	    svg.selectAll(".subunit")
			    .data(subunits.features)
		    .enter().append("path")
			    .attr("class", function(d) { return "subunit " + d.id})
			    .attr("d", path);
		
		// DATA FETCH AND PROCESSING

		var countries = [],
			minRetailPrice = 1000000,
			maxRetailPrice = 0,
			minWholesalePrice = 1000000,
			maxWholesalePrice = 0;

		d3.json("cocaine.json", function (error, data) {

			data.features.forEach( function (country) {
			
				// build countries array

				countries.push({
					name: country.properties["Country name"],
					id: country.properties["Alpha-2"],
					retailPrice: Math.round(+country.properties["Retail price"]),
					wholesalePrice: Math.round(+country.properties["Wholesale price"]/1000)
				}) 

				// find min and max values

				if (country.properties["Retail price"] && +country.properties["Retail price"] < minRetailPrice) {
					minRetailPrice = +country.properties["Retail price"];
				}

				if (country.properties["Retail price"] && +country.properties["Retail price"] > maxRetailPrice) {
					maxRetailPrice = +country.properties["Retail price"];
				}

				if (country.properties["Wholesale price"] && +country.properties["Wholesale price"] < minWholesalePrice) {
					minWholesalePrice = +country.properties["Wholesale price"];
				}

				if (country.properties["Wholesale price"] && +country.properties["Wholesale price"] > maxWholesalePrice) {
					maxWholesalePrice = +country.properties["Wholesale price"];
				}

			});

			// kilo to gram

			minWholesalePrice = minWholesalePrice/1000;
			maxWholesalePrice = maxWholesalePrice/1000;

			// scales

			var retailScale = d3.scale.linear()
				.domain([minRetailPrice, maxRetailPrice])
				.range(["#B9EEAA", "#194400"]),
				wholesaleScale = d3.scale.linear()
				.domain([minWholesalePrice, maxWholesalePrice])
				.range(["#B9EEAA", "#2A5511"]);

			// scale colour countries

			function colorCountries (countries, selection) {
				countries.forEach( function (country) {
					if (selection === "Retail price") {
						d3.selectAll(".subunit." + country.name).transition()
							.duration(750)
							.style("fill", retailScale(country.retailPrice));
					}
					else {
						if (country.wholesalePrice === 0) {
							d3.selectAll(".subunit." + country.name).transition()
								.duration(750)
								.style("fill", "#F3F3F3");
						}
						else {
							d3.selectAll(".subunit." + country.name).transition()
								.duration(750)
								.style("fill", wholesaleScale(country.wholesalePrice));
						}
					}
				})
			}

			// BUTTON LOGIC

			var selection = "Retail price";

			colorCountries(countries, selection)

			document.getElementById("buttonRetail").addEventListener("click", function () {
				selection = "Retail price";
				colorCountries(countries, selection);
				displayDefault();
			})

			document.getElementById("buttonWholesale").addEventListener("click", function () {
				selection = "Wholesale price";
				colorCountries(countries, selection);
				displayDefault();
			})
		
			// DISPLAY TEXT ON EVENTS

			function displayDefault () {
				d3.select(".databox").transition()
					.text("Hover over a country for price data");
			}

			displayDefault();

			function displayDefault1 () {
				d3.select(".databox").transition()
					.text("Hover over another country for price data");
			}

			function displayText (name, price) {
				d3.select(".databox").transition()
					.text(name + "\xA0\xA0\xA0\xA0" + "$" + "\xA0" + price); // print the required text to the databox
			}

			function displayOptions (country) {
				if (selection === "Retail price") { // on page load and retail button click...
					if (country.retailPrice !== 0) {
						displayText(country.name, country.retailPrice); // ...call displayText function (see above) with retailPrice
					}
				}
				else { // on wholesale button click...
					if (country.wholesalePrice !== 0) {
						displayText(country.name, country.wholesalePrice); // ...call displayText function (see above) with wholesalePrice
					}
				}
			}

			countries.forEach(function (country) { // run through the countries array
				d3.selectAll(".subunit." + country.name) // select each path using its country id
					// MOUSEOVER
					.on("mouseover", function(){ // add a mouseover event listener
						displayOptions(country); // call displayAlternatives function (see above)
					})
					// MOUSELEAVE
					.on("mouseleave", function(){ // add a mouseleave event listener
						displayDefault1(); // call displayDefault function (see above)
					})
					// CLICK (not in use)
					// .on("click", function(){ // add a click event listener
					// 	displayOptions(country); // call displayAlternatives function (see above)
					// });	
			});
		});
	});

	document.getElementById("buttonRetail").addEventListener("click", function () {
		document.getElementById("buttonRetail").classList.remove('inactive');
		document.getElementById("buttonRetail").classList.add('active');
		document.getElementById("buttonWholesale").classList.remove('active');
		document.getElementById("buttonWholesale").classList.add('inactive');
	});

	document.getElementById("buttonWholesale").addEventListener("click", function () {
		document.getElementById("buttonRetail").classList.remove('active');
		document.getElementById("buttonRetail").classList.add('inactive');
		document.getElementById("buttonWholesale").classList.remove('inactive');
		document.getElementById("buttonWholesale").classList.add('active');
	});
// d3.json function designed to get data from a topojson file

 function getData(file, callback){
	d3.json(file, function (error, data) {
	  callback(error, data);
	});
}


// function for setting the color of countries in accordance to there cocaine prices 

function colorCountries (countries, selection) {
	countries.forEach( function (country) {
		if (selection === "Retail price") {
			d3.selectAll(".subunit." + country.name).transition()
			.duration(750)
			.style("fill", retailScale(country.retailPrice));
		}
		else{
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
// Create the tile layer that will be the background of our map
var queryUrl =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// create api call to the eathrquak website  


var circles = []
// Define streetmap and darkmap layers
  
circle_group = L.layerGroup(circles)

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
  
    // Define a baseMaps object to hold our base layers
var layers = {
  circle_feats: new L.LayerGroup()

};
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [layers.circle_feats]
    });
    //add our street map to map
    streetmap.addTo(myMap);
    //create an overlays object to add to the layer control
    var overlays = {
      "Circle Feats": layers.circle_feats
    };

    // Create a layer control
    L.control.layers(null,overlays).addTo(myMap);

    // Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
  //ADD INFO

});

info.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");

  var grades = [0, 1, 2, 3, 4, 5];
  var colors = ["Green", "Green", "Orange", "Orange", "RedOrange", "Red"]
};


    // Add the layer control to the map
    info.onAdd = function() {
      var div = L.DomUtil.create("div", "legend");
      return div;
    };
info.addTo(myMap
  )
    d3.json(queryUrl, function(data) {


      // Once we get a response, send the data.features object to the createFeatures function
      data.features.forEach(earthquake =>{
  
          var newCircle = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]] , {
            fillOpacity: 0.75,
            color: color_c(earthquake.properties.mag),
            fillColor: color_c(earthquake.properties.mag),
            // Setting our circle's radius equal to the output of our markerSize function
            // This will make our marker's size proportionate to its population
            radius: earthquake.properties.mag * 7000
            
          })
          newCircle.bindPopup("<h1>" + earthquake.properties.place + "</h1> <hr> <h3>Magnitude: " + earthquake.properties.mag + "</h3>");
          newCircle.addTo(layers["circle_feats"])
          //newCircle.addTo(myMap)

        
    })});
    circle_group = L.layerGroup(circles)
  function markerSize(magnitude) {
    return magnitude * 100;
  };

  function color_c(magnitude) {
      if (magnitude >5 ) {
        return color = "Red";
      }
      if (magnitude >4 ){
          return color = "DarkOrange "
      }
      if (magnitude >3){
          return color = "Orange"
      }
      if (magnitude >2 ){
          return color = "Yellow" 
      }
      else {
          return color = "green"
      }
  };
  
  var legend = L.control({
    position: 'bottomright'
  });

  legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + color_c(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);


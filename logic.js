let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
let earthquakes=L.layerGroup();

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a  baseMaps object.
let baseMaps = {
  "Street Map": street,
  // "Satellite Map": satellite,
  "Topographic Map": topo
};

// Create an overlay object to hold our overlay.
let overlayMaps = {
  "Earthquakes": earthquakes
};

// Create our map, giving it the streetmap and earthquakes layers to display on load.
let myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [street, earthquakes]
});

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


// 
d3.json(queryUrl).then(function(quakedata){ 

  function bubble_size(quake_magnitude){
    return quake_magnitude*4;
  };

  function bubble_color(quake_depth){
    switch(true)
    {
      case quake_depth > 5:
        return "red";
      case quake_depth > 4:
        return "orangered";
      case quake_depth > 3:
        return "orange";
      case quake_depth > 2:
        return "gold";
      case quake_depth > 1:
        return "yellow";
      default:
        return "lightgreen";
    }
  }
  // GeoJson layer
  L.geoJSON(quakedata,{
    pointToLayer:function(feature,latlng){
      return L.circleMarker(latlng, 
        {
          radius:bubble_size(feature.properties.mag),
          fillColor:bubble_color(feature.geometry.coordinates[2]),
          fillOpacity:0.6,
          color:"black",
          stroke:true,
          weight:0.5
        }
      );
    },
    onEachFeature:function(feature,layer)
    {
        layer.bindPopup(
          "<h3>Location: "+
          feature.properties.place+
          "</h3><hr><p>Date: "+
          new Date(feature.properties.time)+
          "</p><hr><p>Magnitude: "+
          feature.properties.mag+
          "</p><hr><p>Depth (km): "+
          feature.geometry.coordinates[2]+
          "</p>");
    }
  }).addTo(earthquakes);

  earthquakes.addTo(myMap);

  let legend=L.control({
    position:"bottomright"
  });

  legend.onAdd=function(){
    let div=L.DomUtil.create("div","info legend"),
    depth=[0,1,2,3,4,5];
    for (let i=0;i<depth.length;i++){
      div.innerHTML+=
      '<x style="background:'+
      bubble_color(depth[i]+1)+
      '"></i> '+
        depth[i]+
        (depth[i+1]? '&ndash;'+
        depth[i+1]+
        '<br>':'+'); 
    }
    return div;
  };
  legend.addTo(myMap);

  let url="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
  
  d3.json(url).then(function(platedata){
    L.geoJSON(platedata,{
      color:"green",
      weight:1
    }).addTo(myMap)});
});
# Leaflet Challenge
In this challenge, a visualization of the United States Geological Service (USGS) earthquake data was developed using Javascript, Leaflet, HTML, and other tools. The following tasks were performed.
1. Get dataset. The earthquake data from the last 30 days was chosen, contained at the following url: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
2. Using Leaflet,  a map was created that plots all the earthquakes from the above dataset based on their longitude and latitude. The map has the following characteristics:
- The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth  appear darker in color.
- Popups provide additional information about an individual earthquake when its associated marker is clicked. 
- A legend provides context for the map's data.
3. The tectonic plates dataset was added to the base map. 

Below is a partial view of the resulting map.

![My Image](screenshot2.PNG)
 proj4.defs([
		[
			'EPSG:4326',
			'+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
		],
		[
			'EPSG:2267',
			'+proj=lcc +lat_1=36.76666666666667 +lat_2=35.56666666666667 +lat_0=35 +lon_0=-98 +x_0=600000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs',
		],
		[
			'SR-ORG:7483',
			'+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
		]
	]);

function do_KDF_mapReady(event, kdf, type, name, map, positionLayer, markerLayer, marker, projection){
   map.on("click", function(evt) {
	
	KDF.setVal("le_gis_lat", evt.mapPoint.y);
    KDF.setVal("le_gis_lon", evt.mapPoint.x);
    KDF.setVal("le_gis_latgeo", evt.mapPoint.y);
    KDF.setVal("le_gis_longeo", evt.mapPoint.x);
	KDF.setVal("txt_ycoordinate", evt.mapPoint.y);
	KDF.setVal("txt_xcoordinate", evt.mapPoint.x);
	
	
  	var source = new proj4.Proj('SR-ORG:7483');    
    var dest = new proj4.Proj('EPSG:2267');
    
    var convertPointP4 = new proj4.Point(evt.mapPoint.x.toString(),evt.mapPoint.y.toString());
    proj4.transform(source, dest, convertPointP4); 
	KDF.customdata('reverse-geocode-arcgis', 'do_KDF_mapClicked', true, true, { 'longitude': convertPointP4.x.toString(), 'latitude': convertPointP4.y.toString() });
	
	map.setZoom(16)
	map.centerAt(new esri.geometry.Point(evt.mapPoint.x, evt.mapPoint.y, new esri.SpatialReference({ wkid: 102100 })));
	
  });
  
 }

function do_KDF_mapClicked(event, kdf, type, name, map, positionLayer, markerLayer, marker, lat, lon, plat, plon){
	console.log(lon)
	console.log(lat)	
	
}

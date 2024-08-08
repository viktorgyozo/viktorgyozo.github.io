var map = L.map('map', {zoomControl:true}).setView([47.4816286643502, 19.054848468750514], 16);

var mapLink = 
	'<a href="http://www.esri.com/">Esri</a>';
var wholink = 
	'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
var baseMapOne = L.tileLayer(
	'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: '&copy; '+mapLink+', '+wholink,
	maxNativeZoom: 19,
	maxZoom: 22
	});
	
var baseMapTwo = L.tileLayer(
	'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: '&copy; '+mapLink+', '+wholink,
	maxNativeZoom: 19,
	maxZoom: 22
	});
	
var baseMapThree = L.tileLayer(
	'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: '&copy; '+mapLink+', '+wholink,
	maxNativeZoom: 19,
	maxZoom: 22
	});

var baseMapFour = L.tileLayer(
	'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: '&copy; '+mapLink+', '+wholink,
	maxNativeZoom: 19,
	maxZoom: 22
	});	
	
baseMapOne.addTo(map);	
	
var imageUrlOne = 'img/BME_alagsor_modified3.png',
        imageBounds = [[47.4801752872009573, 19.0537378370898729], [47.4825626161319363, 19.0571064648094222]];
var alagsorKep = L.imageOverlay(imageUrlOne, imageBounds);
//alagsorKep.addTo(map); 

var imageUrlTwo = 'img/BME_elso_modified.png',
        imageBounds = [[47.4801582203560812,19.0536990233776891,47.4801582203560812], [47.4825607218377854, 19.0570853841391425]];
var elsoKep = L.imageOverlay(imageUrlTwo, imageBounds);
//alagsorKep.addTo(map); 

var alapTerkep = L.layerGroup([baseMapOne])
var foldszint = L.layerGroup([alagsorKep, baseMapTwo])
var elsoEmelet = L.layerGroup([elsoKep, baseMapThree])
var baseMaps = {
    "Alaptérkép": alapTerkep,
    "Földszint": foldszint,
	"Első emelet": elsoEmelet
};

var layerControl = L.control.layers(baseMaps).addTo(map);


export { map }; 
export { alapTerkep, foldszint, elsoEmelet };

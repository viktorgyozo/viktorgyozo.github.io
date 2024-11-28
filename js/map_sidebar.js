let map = L.map('map', {zoomControl:true}).setView([47.4816286643502, 19.054848468750514], 16);

map.setMaxBounds([
	//south west
	[47.475186528326155, 19.043383598327637],
	//north east
	[47.48806400761193, 19.06630039215088]
	], );

map.options.minZoom = 15;

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

var baseMapFive = L.tileLayer(
	'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: '&copy; '+mapLink+', '+wholink,
	maxNativeZoom: 19,
	maxZoom: 22
	});	

var baseMapSix = L.tileLayer(
	'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: '&copy; '+mapLink+', '+wholink,
	maxNativeZoom: 19,
	maxZoom: 22
	});	
	
baseMapOne.addTo(map);	
	
var imageUrlOne = 'img/BME_alagsor_modified3.png',
        imageBounds = [[47.4801752872009573, 19.0537378370898729], [47.4825626161319363, 19.0571064648094222]];
var alagsorKep = L.imageOverlay(imageUrlOne, imageBounds, {zIndex: 1, pane:'overlayPane'});
//alagsorKep.addTo(map); 

var imageUrlTwo = 'img/BME_elso_modified.png',
        imageBounds = [[47.4801582203560812,19.0536990233776891], [47.4825607218377854, 19.0570853841391425]];
var elsoKep = L.imageOverlay(imageUrlTwo, imageBounds, {zIndex: 1, pane:'overlayPane'});
//alagsorKep.addTo(map); 

var imageUrlThree = 'img/magasf.png',
        imageBounds = [[47.4804501793048885,19.0539351511113182], [47.4824699891670505,19.0569682173589783]];
var magasFKep = L.imageOverlay(imageUrlThree, imageBounds, {zIndex: 1, pane:'overlayPane'});
//alagsorKep.addTo(map); 

var imageUrlFour = 'img/masodik.png',
        imageBounds = [[47.4804501793048885,19.0539351511113182], [47.4824699891670505,19.0569682173589783]];
var masodikKep = L.imageOverlay(imageUrlFour, imageBounds, {zIndex: 1, pane:'overlayPane'});
//alagsorKep.addTo(map); 

var imageUrlFive = 'img/harmadik.png',
        imageBounds = [[47.4804501793048885,19.0539351511113182], [47.4824699891670505,19.0569682173589783]];
var harmadikKep = L.imageOverlay(imageUrlFive, imageBounds, {zIndex: 1, pane:'overlayPane'});
//alagsorKep.addTo(map); 



var alapTerkep = L.layerGroup([baseMapOne])
var foldszint = L.layerGroup([alagsorKep, baseMapTwo])
var elsoEmelet = L.layerGroup([elsoKep, baseMapThree])
var masodikEmelet = L.layerGroup([masodikKep, baseMapFour]);
var harmadikEmelet = L.layerGroup([harmadikKep, baseMapFive]);
var magasFoldszint = L.layerGroup([magasFKep, baseMapSix]);
var polyLayer = L.layerGroup();

var baseMaps = {
    "Alaptérkép": alapTerkep,
    "Földszint": foldszint,
	"Első emelet": elsoEmelet,
	"Második emelet": masodikEmelet,
	"Magasföldszint": magasFoldszint,
	"Harmadik emelet": harmadikEmelet,
};

var layerControl = L.control.layers(baseMaps).addTo(map);

	let fsz;
    // Function to load the GeoJSON
    async function loadfsz() {
        try {
            const response = await fetch('./fsz.geojson'); // Adjust the path as needed
            if (!response.ok) {
                throw new Error(`Failed to fetch GeoJSON: ${response.status} ${response.statusText}`);
            }
            fsz = await response.json(); // Parse and store the GeoJSON data
            //console.log('GeoJSON loaded:', fsz); // Verify in console
        } catch (error) {
            //console.error('Error loading GeoJSON:', error);
        }
    }

    loadfsz();

    let mfsz;

    async function loadmfsz() {
        try {
            const response = await fetch('./mfsz.geojson'); // Adjust the path as needed
            if (!response.ok) {
                throw new Error(`Failed to fetch GeoJSON: ${response.status} ${response.statusText}`);
            }
            mfsz = await response.json(); // Parse and store the GeoJSON data
            //console.log('GeoJSON loaded:', mfsz); // Verify in console
        } catch (error) {
            //console.error('Error loading GeoJSON:', error);
        }
    }

    loadmfsz();

    let I;
    async function loadI() {
        try {
            const response = await fetch('./I.geojson'); // Adjust the path as needed
            if (!response.ok) {
                throw new Error(`Failed to fetch GeoJSON: ${response.status} ${response.statusText}`);
            }
            I = await response.json(); // Parse and store the GeoJSON data
            //console.log('GeoJSON loaded:', I); // Verify in console
        } catch (error) {
            //console.error('Error loading GeoJSON:', error);
        }
    }

    loadI();

    let II;
    async function loadII() {
        try {
            const response = await fetch('./II.geojson'); // Adjust the path as needed
            if (!response.ok) {
                throw new Error(`Failed to fetch GeoJSON: ${response.status} ${response.statusText}`);
            }
            II = await response.json(); // Parse and store the GeoJSON data
            //console.log('GeoJSON loaded:', II); // Verify in console
        } catch (error) {
            //console.error('Error loading GeoJSON:', error);
        }
    }

    loadII();

    let III;
    async function loadIII() {
        try {
            const response = await fetch('./III.geojson'); // Adjust the path as needed
            if (!response.ok) {
                throw new Error(`Failed to fetch GeoJSON: ${response.status} ${response.statusText}`);
            }
            III = await response.json(); // Parse and store the GeoJSON data
            //console.log('GeoJSON loaded:', III); // Verify in console
        } catch (error) {
            //console.error('Error loading GeoJSON:', error);
        }
    }

    loadIII();


const resizeObserver = new ResizeObserver(() => {
	map.invalidateSize();
  });
  
  resizeObserver.observe(document.getElementById("map"));
export { map }; 
export { alapTerkep, foldszint, elsoEmelet, masodikEmelet, harmadikEmelet, magasFoldszint, fsz, mfsz, I, II, III, polyLayer};

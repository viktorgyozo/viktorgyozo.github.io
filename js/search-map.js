import { map } from './map_sidebar.js';
import './leaflet.js';
import { alapTerkep, foldszint, elsoEmelet } from './map_sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
	const resultsContainer = document.querySelector('.list-group.item-sidebar');
    const markersLayer = L.layerGroup().addTo(map);
	
    let fsz; // Declare a global variable to store the GeoJSON

    // Function to load the GeoJSON
    async function loadfsz() {
        try {
            const response = await fetch('./fsz.geojson'); // Adjust the path as needed
            if (!response.ok) {
                throw new Error(`Failed to fetch GeoJSON: ${response.status} ${response.statusText}`);
            }
            fsz = await response.json(); // Parse and store the GeoJSON data
            console.log('GeoJSON loaded:', fsz); // Verify in console
        } catch (error) {
            console.error('Error loading GeoJSON:', error);
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
            console.log('GeoJSON loaded:', mfsz); // Verify in console
        } catch (error) {
            console.error('Error loading GeoJSON:', error);
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
            console.log('GeoJSON loaded:', I); // Verify in console
        } catch (error) {
            console.error('Error loading GeoJSON:', error);
        }
    }

    loadI();

    let II;
    async function loadII() {
        try {
            const response = await fetch('./I.geojson'); // Adjust the path as needed
            if (!response.ok) {
                throw new Error(`Failed to fetch GeoJSON: ${response.status} ${response.statusText}`);
            }
            II = await response.json(); // Parse and store the GeoJSON data
            console.log('GeoJSON loaded:', II); // Verify in console
        } catch (error) {
            console.error('Error loading GeoJSON:', error);
        }
    }

    loadIII();

    let III;
    async function loadIII() {
        try {
            const response = await fetch('./I.geojson'); // Adjust the path as needed
            if (!response.ok) {
                throw new Error(`Failed to fetch GeoJSON: ${response.status} ${response.statusText}`);
            }
            II = await response.json(); // Parse and store the GeoJSON data
            console.log('GeoJSON loaded:', III); // Verify in console
        } catch (error) {
            console.error('Error loading GeoJSON:', error);
        }
    }

    loadIII();


    function search() {
        const searchString = searchBar.value.toLowerCase();

        const allGeoJSONs = [fsz, mfsz, I, II,III]; 
        const allFeatures = allGeoJSONs.flatMap(geojson => geojson.features);

        const filteredData = geoJsonData.features.filter(feature => {
            return feature.properties.nev.toLowerCase().includes(searchString);
        });
        displayResults(filteredData);
    }

    searchButton.addEventListener('click', search);

    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            search();
        }
    });

 function displayResults(results) {
        resultsContainer.innerHTML = `
            <a href="#" class="list-group-item active" id="resultItem">
                A keresés eredményei:
            </a>
        `;
        results.forEach((result, index) => {
			const a = document.createElement('a');
			if (index < 5){
            a.href = '#';
            a.classList.add('list-group-item');
            a.innerHTML = `
                <h5><b>${result.properties.nev}</b></h5>
            `;
			}
            a.addEventListener('click', () => {
				    document.querySelectorAll('#searchresult .list-group-item').forEach(item => {
					item.classList.remove('active');
				});	
                if (a.id=='resultItem'){
                    return;
                }
                markersLayer.clearLayers();
				a.classList.add("active");
				const [lon, lat] = result.properties.centroid;
                map.setView([lat, lon], 20);
				const marker = L.marker([lat, lon]);
                markersLayer.addLayer(marker);
				elsoEmelet.addTo(map);
                preview.outerHTML = `
				<img src="teremkepek/` + result.properties.azonosito +`.jpg" data-holder-rendered="true" id="preview" style="height: 200px; width: 100%; display: block;">
				`;
				previewdesc.outerHTML = 
                '<div class="caption" id="previewdesc">' +
				'<h4>'+result.properties.nev+'</h4> \n <p>Férőhely:'+result.properties.ferohely+'</p>'+
                '</div>';
            });
            resultsContainer.appendChild(a);
        });
    }
});

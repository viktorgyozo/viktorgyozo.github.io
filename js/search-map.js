import { map } from './map_sidebar.js';
import './leaflet.js';
import { alapTerkep, foldszint, elsoEmelet } from './map_sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
	const resultsContainer = document.querySelector('.list-group.item-sidebar');
    const markersLayer = L.layerGroup().addTo(map);
	
    fetch('./fsz.geojson')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return fsz.json();
    })
    .then(geojsonData => {
        fsz = geojsonData;
      console.log(fsz);
      // Use the geojsonData here
    })


    function search() {
        const searchString = searchBar.value.toLowerCase();
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

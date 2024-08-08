import { map } from './map_sidebar.js';
import './leaflet.js';
import { alapTerkep, foldszint, elsoEmelet } from './map_sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
	const resultsContainer = document.querySelector('.list-group.item-sidebar');

	
    const geoJsonData = {
		"type": "FeatureCollection",
		"name": "elsoemelet",
		"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
		"features": [
		{ "type": "Feature", "properties": { "id": 1, "nev": "Fotogrammetria és Térinformatika Tanszék", "ferohely": "Nincs", "azonosito": "BMEFMT" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 19.054630763796894, 47.481908299222198 ], [ 19.054673255493391, 47.481931343614818 ], [ 19.054700534113362, 47.481946588361303 ], [ 19.054993254689201, 47.481695935805149 ], [ 19.054921910606204, 47.481657646483349 ], [ 19.054630763796894, 47.481908299222198 ] ] ] ] } },
		{ "type": "Feature", "properties": { "id": 2, "nev": "K142", "ferohely": "2x18", "azonosito": "K142", "centroid": [19.05500095,47.48137878]}, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 19.054864905284976, 47.481341640336069 ], [ 19.054919462524921, 47.481293187467791 ], [ 19.055128248885463, 47.481406874371089 ], [ 19.055072992193733, 47.481453672650652 ], [ 19.054864905284976, 47.481341640336069 ] ] ] ] } },
		{ "type": "Feature", "properties": { "id": 1, "nev": "K143", "ferohely": "15", "azonosito": "KF3valami" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 19.054663950253886, 47.481879814067042 ], [ 19.054689625463414, 47.481893500729029 ], [ 19.054712417360644, 47.481873782655526 ], [ 19.054718115334957, 47.481876241615694 ], [ 19.054725186315125, 47.481870395785698 ], [ 19.054694499634213, 47.481853786201675 ], [ 19.054663950253886, 47.481879814067042 ] ] ] ] } }
		]
		};


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
            <a href="#" class="list-group-item active">
                A keresés eredményei:
            </a>
        `;
        results.forEach((result, index) => {
            const a = document.createElement('a');
            a.href = '#';
            a.classList.add('list-group-item');
            a.innerHTML = `
                <h3>${result.properties.nev}</h3>
            `;
            a.addEventListener('click', () => {
				    document.querySelectorAll('#searchresult .list-group-item').forEach(item => {
					item.classList.remove('active');
				});	
				a.classList.add("active")
				const [lon, lat] = result.properties.centroid
                map.setView([lat, lon], 20);
				const marker = L.marker([lat, lon]).addTo(map);
				elsoEmelet.addTo(map);
                preview.outerHTML = `
				<img src="teremkepek/` + result.properties.azonosito +`.jpg" data-holder-rendered="true" id="preview" style="height: 200px; width: 100%; display: block;">
				`;
				previewdesc.outerHTML = 
				'<h4>'+result.properties.nev+'</h4> \n <p>Férőhely:'+result.properties.ferohely+'</p>'
            });
            resultsContainer.appendChild(a);
        });
    }
});
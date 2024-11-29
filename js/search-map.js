import { map } from './map_sidebar.js';
import './leaflet.js';
import { alapTerkep, foldszint, elsoEmelet, masodikEmelet, harmadikEmelet, magasFoldszint, fsz, mfsz, I, II,III, polyLayer} from './map_sidebar.js';


document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
	const resultsContainer = document.querySelector('.list-group.item-sidebar');
    const markersLayer = L.layerGroup().addTo(map);
    polyLayer.addTo(map);
    const geoJsonLayer = L.layerGroup().addTo(map);

    function search() {
        const searchString = searchBar.value.toLowerCase();
        const allGeoJSONs = [fsz, mfsz, I, II,III]; 
        const allFeatures = allGeoJSONs.flatMap(geojson => geojson.features);

        const filteredData = allFeatures.filter(feature => {
            //console.log(feature.properties)
            return feature.properties.CLASS_NUM.toLowerCase().includes(searchString);
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
                <h5><b>${result.properties.CLASS_NUM}</b></h5>
            `;
			}
            a.addEventListener('click', () => {
				    document.querySelectorAll('#searchresult .list-group-item').forEach(item => {
					item.classList.remove('active');
				});	
                if (a.id=='resultItem'){
                    return;
                }
                map.removeLayer(polyLayer);
                map.eachLayer(function(layer) {
                    map.removeLayer(layer);
                  });
                markersLayer.clearLayers();
				a.classList.add("active");
				const [lon, lat] = calculatePolygonCentroid(result.geometry.coordinates);
                //console.log(result.properties.OWNER)
                map.setView([lat, lon], 20);
				const marker = L.marker([lat, lon]);
                markersLayer.addLayer(marker);

                const secondChar = result.properties.CLASS_NUM.charAt(1).toUpperCase();  // SZINTVALASZTO MAJD
                switch (secondChar) {
                    case 'F':
                        foldszint.addTo(map);
                        break;
                    case '1':
                        elsoEmelet.addTo(map);
                        break;
                    case '2':
                        masodikEmelet.addTo(map);
                        break;
                    case 'M':
                        magasFoldszint.addTo(map);
                        break;
                    case '3':
                        harmadikEmelet.addTo(map);
                        break;
                }
                polyLayer.clearLayers();
                markersLayer.addTo(map);

                const polyg = new L.polygon(flipCoordinates(result.geometry.coordinates)[0][0],{zindex: 1000})
                polyLayer.addLayer(polyg);
                polyLayer.eachLayer(function(layer) {
                    layer.options.pane = 'shadowPane';  // Specify the custom pane for each layer
                  });

                polyLayer.addTo(map);
                preview.outerHTML = `
				<img src="teremkepek/` + result.properties.azonosito +`.jpg" data-holder-rendered="true" id="preview" style="height: 200px; width: 100%; display: block;">
				`;
				previewdesc.outerHTML = 
                '<div class="caption" id="previewdesc">' +
				'<h4>'+result.properties.CLASS_NUM+'</h4> \n <p>Férőhely:'+result.properties.SEAT_NUM+'</p>'+
                '\n <p>Tulajdonos: '+result.properties.OWNER+'</p>'+
                '\n <p>Megközelíthetőség: '+result.properties.REACH+'</p>'+
                '\n <p>Kulcs helye: '+result.properties.KEY_LOC+'</p>'+
                '</div>';
            });
            resultsContainer.appendChild(a);
        });
    }
    document.getElementById('custom-checkbox-termek').addEventListener('change', function () {
        if (this.checked) {
          if (map.hasLayer(elsoEmelet)) {
            geoJsonLayer.addLayer(L.geoJSON(I, {
                style: {
                    color: "#ff7800",     
                    weight: 5,            
                    opacity: 0.65,         
                    fillOpacity: 0.35,
                    pane: 'shadowPane'
                },    
                onEachFeature: function (feature, layer) {
                    // Check if the feature has the CLASS_NUM property and create the tooltip content
                    if (feature.properties && feature.properties.CLASS_NUM) {
                        let tooltipContent = `${feature.properties.CLASS_NUM}`;
                            
                        // Bind the tooltip with the CLASS_NUM property value as the label
                        layer.bindTooltip(tooltipContent, { permanent: true, direction: 'center', className: 'my-tooltip-class'});
                    }
                }
            }
        )
    );
            geoJsonLayer.addTo(map);
          } //else if(){}
        } else {
            geoJsonLayer.clearLayers();
            map.removeLayer(geoJsonLayer);
            map.removeLayer(polyLayer);
            map.removeLayer(markersLayer);
        }
      });
    function calculatePolygonCentroid(coordinates) {
        // Flatten the nested coordinates (since this is a polygon, coordinates will be in a multi-level array)
        const flatCoordinates = coordinates[0][0]; // We access the first polygon and first ring (coordinates)
    
        // Initialize sums for x (longitude) and y (latitude)
        let sumX = 0;
        let sumY = 0;
    
        // Loop through the coordinates and sum the x and y values
        flatCoordinates.forEach(coord => {
            sumX += coord[0]; // longitude (x)
            sumY += coord[1]; // latitude (y)
        });
    
        // Calculate the average (centroid) by dividing by the number of coordinates
        const centroidX = sumX / flatCoordinates.length;
        const centroidY = sumY / flatCoordinates.length;
    
        return [centroidX, centroidY]; // Return as [longitude, latitude]
    }

    map.on('baselayerchange', () => {
        // Uncheck the checkbox
        document.getElementById('custom-checkbox-termek').checked = false;
      
        // Remove any active GeoJSON layers
        geoJsonLayer.clearLayers();
        //markersLayer.clearLayers();
        map.removeLayer(geoJsonLayer);
        map.removeLayer(polyLayer);
        map.removeLayer(markersLayer)
      });

function flipCoordinates(coords) {
    return coords.map(polygon => {
        return polygon.map(ring => {
            return ring.map(coord => {
                return [coord[1], coord[0]]; // Flip [latitude, longitude] -> [longitude, latitude]
            });
        });
    });
    
}

});

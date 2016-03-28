({
	jsLoaded: function(component, event, helper) {

        setTimeout(function() {
            var map = L.map('map', {zoomControl: false});
            map.locate({setView: true, maxZoom: 14});
            L.tileLayer(
             'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
             {
                    attribution: 'Tiles © Esri'
             }).addTo(map);
            component.set("v.map", map);
            
            
        });
  },
  
    markMap: function(component, event, helper) {
        debugger;
        var map = component.get('v.map');
        var address = event.getParam('address');
        var y0 = event.getParam('lat');
        var x0 = event.getParam('lng');
        
        var pos = [y0, x0];
        
        var popupContent = address;      
        var marker = L.marker(pos).addTo(map).bindPopup(popupContent);
    }
})
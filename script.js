$(document).ready(function() {

  //Make it a little easier to reference each of the elements
  
  var place = $('#place');
  var weather = $('#weather');
  var temp = $('#temperature');
  var unit = $('#unit');
  var icon = $('#icon');
  
  var icons = {'01d': 2, '01n': 3, '02d': 30, '02n': 31, '03d': 32, '03n': 32, '04d': 25, '04n': 25, '09d': 34, '09n': 34, '10d': 35, '10n': 35, '11d': 27, '11n': 27, '13d': 39, '13n': 39, '50d': 10, '50n': 11};
  
  var selectedUnit;
  
  //Correspondence between units and temp scales
  
  var tempUnits = {'metric':'°C','imperial':'°F','standard':' K'};

  
  function changeUnits() {
    unit.text(tempUnits[selectedUnit]);
  }
  
  //Function to load data from the API
  
  function populate(data) {
    changeUnits();
    
    place.text(data.name);
    weather.text(data.weather[0].description);
    temp.text(data.main.temp);
    icon.html(`<img src="icons/${icons[data.weather[0].icon]}.svg" alt="${data.weather[0].description}" title="${data.weather[0].description}" class="weatherIcon">`);
  }
  
  
  function getLatAndLon(position) {
    
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    selectedUnit = $('input[name="unit"]:checked').val();
    
    $.ajax({
      dataType: 'json',
      cache: true, //change?
      url: `https://zippy-thorn.glitch.me/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${selectedUnit}&appid=7c66f6e59a1ea4bb1554ef796beaa5c1`,

      success: populate,
      error: function() {
        alert(`AJAX error (but geo still working? Latitude: ${lat}; Longitude: ${lon})`);
      }
    });
    
  }
  
  function geoError() {
    alert('Geolocation error');
  }
  
  function refreshInfo() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLatAndLon, geoError);
    } else {
      alert('Sorry, your browser does not support Geolocation.');
    }
  }

  refreshInfo();
  
  $('#unitSelector').click(function() {
    refreshInfo();
  });
  

  
});

$(document).ready(function() {

  //Make it a little easier to reference each of the elements
  
  var place = $('#place');
  var weather = $('#weather');
  var temperature = $('#temperature');
  var unit = $('#unit');
  
  //Correspondence between units and temp scales
  
  var tempUnits = {'celsius':'°C','fahrenheit':'°F','kelvin':' K'};

  
  function changeUnits() {
    var selectedUnit = $('input[name="unit"]:checked').val();
    unit.text(tempUnits[selectedUnit]);
  }
  
  //Function to load data from the API
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLatAndLon);
  }
  
  function getLatAndLon() {
    alert(position.coords.latitude + ', ' + position.coords.longitude)
  }
  
  //Function to refresh all data
  
  function refresh() {
    place.text('Shenzhen');
    weather.text('sunny');
    temperature.text('0');
    
    //refreshInfo();
    changeUnits();
  
  }
  
  refresh();
  
  $('#unitSelector').click(function() {
    changeUnits();
  });
  
});

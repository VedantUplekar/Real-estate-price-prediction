// Function to get the selected number of bathrooms
function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value); // Use the value directly from the checkbox
        }
    }
    return -1; // Invalid Value
}

// Function to get the selected number of BHK
function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value); // Use the value directly from the checkbox
        }
    }
    return -1; // Invalid Value
}

// Function to handle the Estimate Price button click
function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    
    // Get input values
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    // Construct the API URL
    var url = "http://127.0.0.1:5000/predict_home_price"; // Flask local server URL

    // Make the POST request
    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
    })
    .done(function(data) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price;
    })
    .fail(function(xhr, status, error) {
        console.error("Error:", xhr.responseText);
        estPrice.innerHTML = "<h2>Error: Unable to estimate price</h2>";
    });
}

// Function to load location names on page load
function onPageLoad() {
    console.log("Document loaded");
    
    // Construct the API URL
    var url = "http://127.0.0.1:5000/get_location_names"; // Flask local server URL
    
    // Make the GET request
    $.get(url)
    .done(function(data) {
        console.log("Got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i = 0; i < locations.length; i++) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    })
    .fail(function(xhr, status, error) {
        console.error("Error fetching location names:", xhr.responseText);
    });
}

// Bind the onPageLoad function to the window's load event
window.onload = onPageLoad;

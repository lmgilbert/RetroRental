let vehicles = {
    "vespa" : {
        "name" :"Vespa",
        "minimumPeople" : 1,
        "maximumPeople" : 1,
        "people" : 1,
        "price" : 109.00,
        "minimumDays" : 1,
        "maximumDays" : 5,
        "distance" : 3.7,
        "category" : "scooter",
        "image" : "pedro-pereira-158920-unsplash.jpg",
        "year" : "1992",
        "description" : "Vespa is an Italian brand of scooter manufactured by Piaggio. The name means wasp in Italian and has evolved from a single model motor scooter manufactured in 1946.",
    },

    "ford" : {
        "name" : "Ford Thunderbird",
        "minimumPeople" : "1",
        "maximumPeople" : "2",
        "people" : [1, 2],
        "price" : 129.00,
        "minimumDays" : "1",
        "maximumDays" : "10",
        "distance" : 8.5,
        "category" : "car",
        "image" : "marifer-583917-unsplash.jpg",
        "year" : "1960",
        "description" : "The Ford Thunderbird is a rear wheel drive automobile made by Ford in the United States over eleven model generations from 1955 through 2005.",
    },

    "lancia" : {
        "name" : "Lancia Fulvia Zagato",
        "minimumPeople" : "1",
        "maximumPeople" : "5",
        "people" : [1, 2, 3, 4, 5],
        "price" : 144.00,
        "minimumDays" : "3",
        "maximumDays" : "10",
        "distance" : 9.7,
        "category" : "car",
        "image" : "josh-rinard-71760-unsplash.jpg",
        "year" : "1973",
        "description" : "Fulvias are notable for their role in motorsport history and is named after Via Fulvia, the Roman road leading from Tortona to Torino.",
    },

    "volkswagen" : {
        "name" : "Volkswagen Camper Van",
        "minimumPeople" : "2",
        "maximumPeople" : "6",
        "people" : [2, 3, 4, 5, 6],
        "price" : 200.00,
        "minimumDays" : "2",
        "maximumDays" : "5",
        "distance" : 17,
        "category" : "camper",
        "image" : "mroux-bulikowska-86260-unsplash.jpg",
        "year" : "1978",
        "description" : "This van is a forward control panel van introduced in 1950 by the German automaker Volkswagen as its second car model and goes by different names.",
    },
}

let $vehicleList = $("#show-vehicles");

let vehicleBody = $(".vehicle-body");
let pricePerDaySpan = $("#day-price");
let selectedDaySpan = $("#selected-day-price");
let litresSpan = $("#distance-price");
let daysVehicleSelect = $("#days-vehicle-select");
let distanceVehicleSelect = $("#distance-vehicle-select");
let selectedDistancePrice = $("#selected-distance-price");
let finalSelectedPrice = $("#final-selected-price");
let quoteButton = $("#quote-button");
let selectedQuoteDaySpan = $("#user-selected-day-price");
let selectedDayP = $("#selected-day-p");
let deleteMe = $("#delete-me");

$(document).ready(function() {
    // Scroll to link
    $('#logo, .nav-link').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        var target_div = $(target);
        $('html,body').animate({scrollTop: $(target_div).offset().top - $("nav").height()}, 'slow');
    });
});

// Filters through people selected people
function filterByNumberOfPeople(unfilteredVehicles, numberOfPeople) {
    var filteredVehicle = {};

    Object.keys(unfilteredVehicles).forEach(function (key) {
        var vehicle = unfilteredVehicles[key];

        if (numberOfPeople >= vehicle.minimumPeople && numberOfPeople <= vehicle.maximumPeople) {
            filteredVehicle[key] = vehicle;
        }
    });

    return filteredVehicle;
}

// Filters through days selected days
function filterByNumberOfDays(unfilteredVehicles, numberOfDays) {
    var filteredVehicle = {};

    Object.keys(unfilteredVehicles).forEach(function (key) {
        var vehicle = unfilteredVehicles[key];

        if (numberOfDays >= vehicle.minimumDays && numberOfDays <= vehicle.maximumDays) {
            filteredVehicle[key] = vehicle;
        }
    });

    return filteredVehicle;
}

// Quote selection and display
quoteButton.click(function(event) {
    // Gets what is selected in the drop downs
    let quotePeopleDropDown = $("#people-select option:selected").text();
    let quoteDaysDropDown = $("#days-select option:selected").text();

    // Runs filtering days and people
    var vehiclesToDisplay = filterByNumberOfPeople(vehicles, quotePeopleDropDown);
    vehiclesToDisplay = filterByNumberOfDays(vehiclesToDisplay, quoteDaysDropDown);

    // Error messages if an option isn't selected or no vehicles available
    let tryAgainMessage = `<h3 class="col text-center">Try Again</h3>`;
    let noVehicles = `<h3 class="col text-center">No available Vehicles :(</h3>`;
    
    // Displays error message if no available vehicles
    if (Object.keys(vehiclesToDisplay).length === 0) {
        $vehicleList.empty();
        $vehicleList.append(noVehicles);
        return;
    }

    // Displays error message if nothing is selected in drop downs
    if (quotePeopleDropDown == "Select People" ) {
        $vehicleList.empty();
        $vehicleList.append(tryAgainMessage);
        return;
    } else if (quoteDaysDropDown == "Select Days" ) {
        $vehicleList.empty();
        $vehicleList.append(tryAgainMessage);
        return;
    }

    $vehicleList.empty();

    // Goes through Vehicle JSON 
    Object.keys(vehiclesToDisplay).forEach(function (key) {

        // Displays whats is inside each vehicle card
        let vehicleItem = `<div class="col-sm-12 col-md-6 col-lg-4">
                                    <div class="card-modal text-center">
                                        <img class="card-img-top" src="img/${vehicles[key].image}" alt="Card image cap">
                                        <div class="card-body">
                                        <h5 class="card-title">${vehicles[key].year} ${key}</h5>
                                        <p class="card-text">${vehicles[key].description}</p>
                                        <p class="price">$${vehicles[key].price} per day</p>
                                        <button data-key="${key}" type="button" class="vehicle-select-button btn" id="${key}-quote-button" data-toggle="modal" data-target="#vehicle-modal" name="${[key]}" data-dismiss="modal">Select</button>
                                    </div>
                                </div>
                            </div>`;
        
        $vehicleList.append(vehicleItem);

        // When quote card button is clicked
        $(".vehicle-select-button").click(function(event) {

            // Gets data-key of the button 
            let VehicleQuoteButtonAttr = $(event.target).attr("data-key");
            
            // Contents of Card
            let vehicleQuoteItem = `<div class="col-lg-6">
                                        <img class="card-img-top" src="img/${vehicles[VehicleQuoteButtonAttr].image}" alt="Card image cap">
                                    </div>
                                    <div class="col-lg-6 text-left">
                                        <h5 class="card-title">${vehicles[VehicleQuoteButtonAttr].year} ${vehicles[VehicleQuoteButtonAttr].name}</h5>
                                        <p class="card-text">${vehicles[VehicleQuoteButtonAttr].description}</p>
                                        <p class="price">$${vehicles[VehicleQuoteButtonAttr].price} per day</p>
                                        <p class="price">Maximum 1 person</p>
                                    </div>`;

            // Inside quote - displays what day they selected when choosing a quote
            let dayP = `Selected days:
                        <span class="price-span" id="user-selected-day-price">${quoteDaysDropDown}</span>`;

            //empties previous contents inside card and adds content
            selectedDaySpan.empty();
            vehicleBody.empty();
            vehicleBody.empty();
            selectedDayP.show();
            selectedDayP.empty();
            vehicleBody.append(vehicleQuoteItem);
            deleteMe.hide();
            distanceVehicleSelect.val(0);
            finalSelectedPrice.empty();
            selectedDistancePrice.empty();

            // Displays price per day and litres per 100km
            pricePerDaySpan.html("$" + vehicles[VehicleQuoteButtonAttr].price.toFixed(2));
            litresSpan.html(vehicles[VehicleQuoteButtonAttr].distance + "L/100km");
            selectedDayP.append(dayP);
            
            // Works out price per day
            var DaysPrice = quoteDaysDropDown * vehicles[VehicleQuoteButtonAttr].price;
            selectedDaySpan.html("$" + DaysPrice.toFixed(2));

            // When user changes distance
            distanceVehicleSelect.change(function() {
                var userSelectedDistance = this.value;

                // Works out selected distance by litres
                var DistancePrice = userSelectedDistance * vehicles[VehicleQuoteButtonAttr].distance;
                selectedDistancePrice.html("$" + DistancePrice.toFixed(2));

                // Works out final price (days price plus distance price)
                var finalPrice = DaysPrice + DistancePrice;
                finalSelectedPrice.html("$" + finalPrice.toFixed(2));
            });
        });           
    });
});



// Bottom Vehicle selection
$(".vehicle-button").click(function(event) {
    // gets the data-button of button that's clicked
    let buttonAttr = $(event.target).attr("data-button");

    vehicleBody.empty();
    selectedDaySpan.empty();

    // Contents of quote
    let vehicleQuoteItem = `<div class="col-lg-6">
                                <img class="card-img-top" src="img/${vehicles[buttonAttr].image}" alt="Card image cap">
                            </div>
                            <div class="col-lg-6 text-left">
                                <h5 class="card-title">${vehicles[buttonAttr].year} ${vehicles[buttonAttr].name}</h5>
                                <p class="card-text">${vehicles[buttonAttr].description}</p>
                                <p class="price">$${vehicles[buttonAttr].price.toFixed(2)} per day</p>
                                <p class="price">Maximum ${vehicles[buttonAttr].maximumPeople} people</p>
                            </div>`;
      
    // Contents of Drop down days
    let MaxDaysItem = `<option selected value="0">Select days</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>`;

    // Goes through Vehicles 
    Object.keys(vehicles).forEach(function(key) {

        // if selected button is in vehicles
        if (buttonAttr in vehicles) {

            // Empties and adds content 
            vehicleBody.empty();
            daysVehicleSelect.empty();
            deleteMe.show();
            selectedDayP.hide();
            distanceVehicleSelect.val(0);
            finalSelectedPrice.empty();
            selectedDistancePrice.empty();
            selectedDaySpan.empty();
            vehicleBody.append(vehicleQuoteItem);
            daysVehicleSelect.append(MaxDaysItem);

            //Displays price per day and litres
            pricePerDaySpan.html("$" + vehicles[buttonAttr].price.toFixed(2));
            litresSpan.html(vehicles[buttonAttr].distance + "L/100km");
            
            /* I had trouble getting the input of the drop down menus early on,
            so I ended up using the .change() function. The problem with this was that the
            final price wouldn't update perfectly all the time. So I ended up putting it in 
            there twice */

            // When days selected has been changed
            daysVehicleSelect.change(function() {
                var userSelectedDays = this.value;

                // Works out how much per selected day
                var DaysPrice = userSelectedDays * vehicles[buttonAttr].price;
                selectedDaySpan.html("$" + DaysPrice.toFixed(2));

                //When distance has changed
                distanceVehicleSelect.change(function() {
                    var userSelectedDistance = this.value;

                    //works out how much per distance
                    var DistancePrice = userSelectedDistance * vehicles[buttonAttr].distance;
                    selectedDistancePrice.html("$" + DistancePrice.toFixed(2));

                    // Works out final price
                    var finalPrice = DaysPrice + DistancePrice;
                    finalSelectedPrice.html("$" + finalPrice.toFixed(2));
                });
            });

            // When distance has changed
            distanceVehicleSelect.change(function() {
                var userSelectedDistance = this.value;

                // Works out how much per distance
                var DistancePrice = userSelectedDistance * vehicles[buttonAttr].distance;
                selectedDistancePrice.html("$" + DistancePrice.toFixed(2));

                // When days has been changed
                daysVehicleSelect.change(function() {
                    var userSelectedDays = this.value;

                    // Works out how much per selected day
                    var DaysPrice = userSelectedDays * vehicles[buttonAttr].price;
                    selectedDaySpan.html("$" + DaysPrice.toFixed(2));

                    // Works out final price
                    var finalPrice = DaysPrice + DistancePrice;
                    finalSelectedPrice.html("$" + finalPrice.toFixed(2));
                });
            });
        }    
    });
})

//Validates Email in the contact section taken from stackoverflow
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  
    function validate() {
    var $result = $("#alert");
    var email = $("#email").val();
    $result.text("");
  
    if (validateEmail(email)) {
        $result.text("");
    } else {
        $result.text("Email is not valid");
        $result.css("color", "#eb5c23");
    }
    return false;
};

$("#validate").bind("click", validate);
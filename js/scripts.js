let $vehicleList = $("#show-vehicles");

let vehicles = {
    "vespa" : {
        "name" :"Vespa",
        "minimumPeople" : "1",
        "maximumPeople" : "1",
        "people" : 1,
        "price" : 109.00,
        "minimumDays" : "1",
        "maximumDays" : "5",
        "distance" : 3.7,
        "category" : "scooter",
        "image" : "pedro-pereira-158920-unsplash.jpg",
        "year" : "1992",
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
    },
}

let vespaQuoteButton = $("#vespa");
let fordQuoteButton = $("#ford");
let lanciaQuoteButton = $("#lancia");
let volkswagenQuoteButton = $("#volkswagen");
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

quoteButton.click(function(event){
    let quotePeopleDropDown = $("#people-select option:selected").text();
    let quoteDaysDropDown = $("#days-select option:selected").text();

    $vehicleList.empty();

    Object.keys(vehicles).forEach(function (key) {
        let vehicleItem = `<div class="col-sm-12 col-md-6 col-lg-4">
                                    <div class="card-modal text-center">
                                        <img class="card-img-top" src="img/${vehicles[key].image}" alt="Card image cap">
                                        <div class="card-body">
                                        <h5 class="card-title">${vehicles[key].year} ${key}</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <p class="price">$${vehicles[key].price} per day</p>
                                        <button type="button" class="${[key]} btn" id="${[key]}-quote-button" data-toggle="modal" data-target="#vehicle-modal" name="${[key]}" data-dismiss="modal">Select</button>
                                    </div>
                                </div>
                            </div>`;
        
        if ((vehicles[key].minimumPeople <= quotePeopleDropDown && vehicles[key].maximumPeople >= quotePeopleDropDown) && (vehicles[key].minimumDays <= quoteDaysDropDown && vehicles[key].maximumDays >= quoteDaysDropDown)) {  
            $vehicleList.append(vehicleItem);
        }
        let vespaVehicleQuoteButton = $("#vespa-quote-button");
        vespaVehicleQuoteButton.click(function(event) {
            let vespaVehicleQuoteButtonAttr = vespaVehicleQuoteButton.attr("name");
            selectedDaySpan.empty();
            vehicleBody.empty();
            
            let vehicleQuoteItem = `<div class="col-lg-6">
                        <img class="card-img-top" src="img/${vehicles[vespaVehicleQuoteButtonAttr].image}" alt="Card image cap">
                    </div>
                    <div class="col-lg-6 text-left">
                        <h5 class="card-title">${vehicles[vespaVehicleQuoteButtonAttr].year} ${vehicles[vespaVehicleQuoteButtonAttr].name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text</p>
                        <p class="price">$${vehicles[vespaVehicleQuoteButtonAttr].price} per day</p>
                        <p class="price">Maximum 1 person</p>
                    </div>`;


                    let dayP = `Selected days:
        <span class="price-span" id="user-selected-day-price">${quoteDaysDropDown}</span>`;
            Object.keys(vehicles).forEach(function (key) {
                if (vespaVehicleQuoteButtonAttr in vehicles) {
                    vehicleBody.empty();
                    selectedDayP.show();
                    selectedDayP.empty();
                    vehicleBody.append(vehicleQuoteItem);
                    deleteMe.hide();
                    distanceVehicleSelect.val(0);
                    finalSelectedPrice.empty();
                    selectedDistancePrice.empty();


                    pricePerDaySpan.html("$" + vehicles[vespaVehicleQuoteButtonAttr].price.toFixed(2));
                    litresSpan.html(vehicles[vespaVehicleQuoteButtonAttr].distance + "L/100km");
                    selectedDayP.append(dayP);
                    
                    var vespaDaysPrice = quoteDaysDropDown * vehicles[vespaVehicleQuoteButtonAttr].price;
                    selectedDaySpan.html("$" + vespaDaysPrice.toFixed(2));

                    distanceVehicleSelect.change(function() {
                        var userSelectedDistance = this.value;
                        var vespaDistancePrice = userSelectedDistance * vehicles[vespaVehicleQuoteButtonAttr].distance;
                        selectedDistancePrice.html("$" + vespaDistancePrice.toFixed(2));
                        var finalPrice = vespaDaysPrice + vespaDistancePrice;
                        finalSelectedPrice.html("$" + finalPrice.toFixed(2));
                    });
                }
            });
        });           
    });
});

$(document).ready(function() {
    
});

vespaQuoteButton.click(function(event) {
    let vespabuttonAttr = vespaQuoteButton.attr("name");
    vehicleBody.empty();
    selectedDaySpan.empty();
    let vehicleQuoteItem = `<div class="col-lg-6">
                                <img class="card-img-top" src="img/${vehicles[vespabuttonAttr].image}" alt="Card image cap">
                            </div>
                            <div class="col-lg-6 text-left">
                                <h5 class="card-title">${vehicles[vespabuttonAttr].year} ${vehicles[vespabuttonAttr].name}</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text</p>
                                <p class="price">$${vehicles[vespabuttonAttr].price} per day</p>
                                <p class="price">Maximum 1 person</p>
                            </div>`;
                            

    let vespaMaxDaysItem = `<option selected value="0">Select days</option>
                        <option value="1" name="1">1</option>
                        <option value="2" name="2">2</option>
                        <option value="3" name="3">3</option>
                        <option value="4" name="4">4</option>
                        <option value="5" name="5">5</option>`;
    Object.keys(vehicles).forEach(function(key) {
        if (vespabuttonAttr in vehicles) {
            vehicleBody.empty();
            daysVehicleSelect.empty();
            deleteMe.show();
            selectedDayP.hide();
            distanceVehicleSelect.val(0);
            finalSelectedPrice.empty();
            selectedDistancePrice.empty();
            selectedDaySpan.empty();


            vehicleBody.append(vehicleQuoteItem);
            pricePerDaySpan.html("$" + vehicles[vespabuttonAttr].price.toFixed(2));
            litresSpan.html(vehicles[vespabuttonAttr].distance + "L/100km");
            daysVehicleSelect.append(vespaMaxDaysItem);

            daysVehicleSelect.change(function() {
                var userSelectedDays = this.value;
                var vespaDaysPrice = userSelectedDays * vehicles[vespabuttonAttr].price;
                selectedDaySpan.html("$" + vespaDaysPrice.toFixed(2));

                distanceVehicleSelect.change(function() {
                    var userSelectedDistance = this.value;
                    var vespaDistancePrice = userSelectedDistance * vehicles[vespabuttonAttr].distance;
                    selectedDistancePrice.html("$" + vespaDistancePrice.toFixed(2));
                    var finalPrice = vespaDaysPrice + vespaDistancePrice;
                    finalSelectedPrice.html("$" + finalPrice.toFixed(2));
                });
            });
            distanceVehicleSelect.change(function() {
                var userSelectedDistance = this.value;
                var vespaDistancePrice = userSelectedDistance * vehicles[vespabuttonAttr].distance;
                selectedDistancePrice.html("$" + vespaDistancePrice.toFixed(2));

                daysVehicleSelect.change(function() {
                    var userSelectedDays = this.value;
                    var vespaDaysPrice = userSelectedDays * vehicles[vespabuttonAttr].price;
                    selectedDaySpan.html("$" + vespaDaysPrice.toFixed(2));
                    var finalPrice = vespaDaysPrice + vespaDistancePrice;
                    finalSelectedPrice.html("$" + finalPrice.toFixed(2));
                });
            });
        }    
    });
});

   
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

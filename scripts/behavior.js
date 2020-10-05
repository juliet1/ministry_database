$(document).ready(function() {
    // Handling opening and closing the drop down menu
    // Menu is only visible in condensed (mobile) views
    $('div.header input#menu-btn').on("click", function() {
        // Toggle the image on the drop down menu button
        if ($(this).attr("class") === "closed") {
            $(this).attr("src", "images/x_button.png");
            $(this).attr("class", "open");
            
            // Create the dropdown menu
            var dropMenu = $('<div id="drop-menu"></div>');
            var link1 = $('<a href="index.html">Home</a>');
            var link2 = $('<a href="list_campus.html">Campus Ministries</a>');
            var link3 = $('<a href="list_church.html">Churches</a>');
            var link4 = $('<a href="favorites.html">Favorites</a>');
            $(dropMenu).appendTo($(this).parent());
            $(link1).appendTo($(dropMenu));
            $(link2).appendTo($(dropMenu));
            $(link3).appendTo($(dropMenu));
            $(link4).appendTo($(dropMenu));

            $(dropMenu).css("display", "block");
        } else {
            $(this).attr("src", "images/closed.png");
            $(this).attr("class", "closed");
            
            // Remove the drop down menu
            $(this).siblings('#drop-menu').remove();
        } 
    });
    
    // Close the dropdown menu whenever someone clicks outside of it
    $(window).on("click", function(event) {
        if(event.target.id != "menu-btn") {
            var dropMenu = $("div#drop-menu");
            $(dropMenu).css("display", "none");
            
            // Change the image on the drop down menu 
            var menuBtn = $(dropMenu).siblings("#menu-btn");
            if ($(menuBtn).attr("class") === "open") {
                $(menuBtn).attr("src", "images/closed.png");
                $(menuBtn).attr("class", "closed");
            }
        }
    });

    // Add or remove a page from a users' favorite list
    $('div.page-rhs input#fav-btn').on("click", function() {
        if ($(this).attr("class") === "not-fav") {
            $(this).attr("src", "images/heart.png");
            $(this).attr("class", "fav");
        }
        else {
            $(this).attr("src", "images/heart_empty.png");
            $(this).attr("class", "not-fav");
        }
    });

    // Show and hide the search bar
    // Used only when in condensed view
    $('#search-small').on("click", function() {
        $('#search-form-hid').toggle();
    });

    // Check for form elements left empty while the form is being edited
    $('div.page-rhs').on("blur", ":input", function() {
        // input was left empty
        if($(this).val().length === 0) {
            $(this).addClass("error");
            // add error message
            if ($(this).siblings("p.error-text").length === 0) {
                var errorText = $('<p class="error-text">This field is required</p>');
                $(errorText).appendTo($(this).parent());
            }
        }
        else {
            // If they came back and entered text, then remove the error message
            $(this).removeClass("error");
            if ($(this).siblings("p.error-text").length != 0 && $(this).siblings(".error").length === 0) {
                $(this).siblings("p.error-text")[0].remove();
            }
        }

    });

    // Validate the input for the new ministry form
    $('form#ministry-input').on("click", "input[type=submit]", function(event) {
        // Iterate over all of the input
        $("#ministry-input :input").each(function() {
            // Check that the field isn't empty
            if ($(this).val().trim().length === 0) {
                event.preventDefault();
                $(this).addClass("error");
                // add an error message for that box/section if there isn't one
                if ($(this).siblings("p.error-text").length === 0) {
                    var errorText = $('<p class="error-text">This field is required</p>');
                    $(errorText).appendTo($(this).parent());
                }
            }
            else {
                // Remove any error attributes it may have
                $(this).removeClass("error");
                if ($(this).siblings("p.error-text").length != 0) {
                    $(this).siblings("p.error-text")[0].remove();
                }

                // Validate that the email address is legit
                if ($(this).attr("name") === "email" && !(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    event.preventDefault();
                    console.log("down here");
                    $(this).addClass("error");
                    var errorText = $('<p class="error-text">Not a valid email address</p>');
                    $(errorText).appendTo($(this).parent());
                }
            }
        });
    });

    // Quick check for a username and password input on login screen
    $('form#login-form').on("click", "input[type=submit]", function(event) {
        $("#login-form :input").each(function() {
            if ($(this).val().trim().length === 0) {
                event.preventDefault();
                if ($(this).siblings("p.error-text").length === 0) {
                    var errorText = $('<p class="error-text">Invalid input</p>');
                    $(errorText).appendTo($(this).parent());
                }
            }
        });
    });

    // Direct the central buttons on the home page where to go
    $('div.home-buttons').on("click", "input[type=button]", function() {
        if($(this).attr("id") === "ministry-btn") {
            window.location = "list_campus.html";
        }
        else {
            window.location = "list_church.html";
        }
    });

    // Check query string
    checkQueryString();
});

// Handle displaying search results based on search input
function checkQueryString() {
    var query = window.location.search;
    var url = new URLSearchParams(query);
    // check for search term
    if (url.has('search-term')) {
        var searchTerm = url.get('search-term');
        if (searchTerm.toLowerCase() === "chi alpha") {
            var newEntry = $('<div class="entry">');
            var heading = $('<h1><a href="details.html">Chi Alpha</a></h1>');
            var location = $('<h2>8pm Wednesdays, Squires Colonial</h2>');
            var description = $('<p>Chi Alpha (XA, short for Christ’s ambassadors: 2 Cor. 5:20) is a community devoted to Christ, fellowship, wholeness, mission, diversity, and empowerment. We have prayer meetings, social events, Bible studies, and a weekly worship service. Get connected, live for Christ, and build a strong foundation for a lifelong relationship with Him while making the best friends of your life in XA along the way!</p>');
            $(newEntry).appendTo($('div#rhs-list'));
            $(heading).appendTo($(newEntry));
            $(location).appendTo($(newEntry));
            $(description).appendTo($(newEntry));
        }
        // no results situation
        else {
            var noResultsHeading = $('<h1>No results found</h1>');
            var response = "We couldn't find any items matching your search for \"" + searchTerm + "\". Please try another search.";
            var noResultsBody = $('<p></p>');
            $(noResultsBody).text(response);
            $(noResultsHeading).appendTo($('div#rhs-list'));
            $(noResultsBody).appendTo($('div#rhs-list'));
        }
    }
}
$(document).ready(function() {
    $('div.header input#menu-btn').on("click", function() {
        // Toggle the image on the drop down menu button
        if ($(this).attr("class") === "closed") {
            $(this).attr("src", "../images/x_button.png");
            $(this).attr("class", "open");
            
            // Create the dropdown menu
            var dropMenu = $('<div id="drop-menu"></div>');
            var link1 = $('<a href="home.html">Home</a>');
            var link2 = $('<a href="camp-listview.html">Campus Ministries</a>');
            var link3 = $('<a href="church-listview.html">Churches</a>');
            var link4 = $('<a href="favorites.html">Favorites</a>');
            $(dropMenu).appendTo($(this).parent());
            $(link1).appendTo($(dropMenu));
            $(link2).appendTo($(dropMenu));
            $(link3).appendTo($(dropMenu));
            $(link4).appendTo($(dropMenu));

            $(dropMenu).css("display", "block");
        } else {
            $(this).attr("src", "../images/closed.png");
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
                $(menuBtn).attr("src", "../images/closed.png");
                $(menuBtn).attr("class", "closed");
            }
        }
    });
    
    $('#search-small').on("click", function() {
        $('#search-form-hid').toggle();
        
    })
    
    $('form').on("submit", function() {
        console.log($('#search-bar').val());
    });
});
// Hold a global reference to the div#main element.
var main;

/**
 * setup()
 *
 * The setup function gets called from your primary event handler for when the page
 * has finished loading. This function sets up the arrows, and initializes anything
 * else you might need later.
 */
var setup = function() {
    // Obtain a reference to the div#main element, and hold on to it in our global var 'main'
    main = document.getElementById('main');

    // Place your initial number of arrows. 50. 
    for (var i = 1; i <= 150; i++) {
        placeArrow();
    }
}

/**
 * placeArrow()
 *
 * This function is called from your setup function, as well as when someone clicks on an
 * empty part of the page. 
 *
 * This function should do the following:
 *    - Create a new arrow element
 *    - Append it to the #main element in the DOM
 *    - Randomly position it on the page
 *    - Attach any CSS classes you want to the new arrow element
 *    - Attach an event handler to the new element so it can respond to a click
 */
var placeArrow = function() {
    // Create a new element to hold your arrow. There are a few different elements you could create.
    var image = document.createElement("IMG"); // Create a image element

    // randomly position the arrow
    // figure out how wide the window is, how tall it is, and figure out a way to
    // randomly create a number between 0 and the width/height of the window
    // then assign the style properties of that element accordingly
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var arrowXCoordinate = Math.floor((Math.random() * windowWidth) + 1);
    var arrowYCoordinate = Math.floor((Math.random() * windowHeight) + 1);

    var arrowId = arrowXCoordinate + "_" + arrowYCoordinate;

    image.setAttribute("id", arrowId);
    image.style.position = "absolute";
    image.style.left = arrowXCoordinate + "px";
    image.style.top = arrowYCoordinate + "px";

    // Add any styles to the arrow element you need
    image.setAttribute("src", "arrow.png");
    image.setAttribute("class", "arrow");
    image.setAttribute("width", "40px");
    image.setAttribute("height", "40px");

    // Add an event listener to the new arrow element so when it gets clicked it calls the
    // removeArrow function.
    image.addEventListener("click", removeArrow);

    // Finally, append the newly created arrow element to the DOM as a child of the #main div.

    main.appendChild(image); //append div to main 


}

/**
 * removeArrow
 *
 * This function is called whenever an arrow element is clicked.  It should remove the clicked
 * on element from the DOM.
 */
var removeArrow = function(event) {
    // Get a reference to this element, and this element's parent.
    var clickedarrowId = this.getAttribute("id");

    var arrow = document.getElementById(clickedarrowId);
    var arrowsParent = arrow.parentNode;

    // Remove this element from the DOM
    arrowsParent.removeChild(arrow);

    // Prevent this click event from bubbling up to the window object. Otherwise we would remove 
    // this arrow, but create a new one.

    event.stopPropagation();
}


// Look at all the arrow elements, and point them all at the mouse cursor.
var checkMove = function(e) {
    // Get a list of all the arrow elements on the page.
    // var arrows = ???;
    var arrows = document.querySelectorAll('#main .arrow');

    // Figure out where the mouse is right now
    // var mouseX = ???;
    // var mouseY = ???;
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    // Loop over each arrow, and point it in the right direction
    for (var i = 0; i < arrows.length; ++i) {

        // Grab a reference to the current arrow in the loop
        var currentArrow = arrows[i];

        // Figure out the X and Y location of the center of the arrow    
        // var aX = ???;
        // var aY = ???;
        var arrowDistLeft = currentArrow.offsetLeft;
        var arrowDistTop = currentArrow.offsetTop;

        //calculate the center point [left,top] of the element. Remember each arrow has a  width and height of 40px.
        var aX = arrowDistLeft + (40 / 2);
        var aY = arrowDistTop + (40 / 2);

        // Calculate the difference between the center of the arrow and the mouse
        // var dx = aX - mouseX;
        // var dy = aY - mouseY;
        var dx = aX - mouseX;
        var dy = aY - mouseY;

        // Calculate the Angle
        // var angle = Math.atan(dy/dx);
        // angle = angle * 180/Math.PI;

        var angle = Math.atan(dy / dx);
        angle = angle * (180 / Math.PI);

        // Modify the angle depending on which side of the arrow the cursor is on
        // if (dx < 0) {
        //   angle += 90;
        // } else {
        //   angle -= 90;
        // }

        if (dx < 0) {
            angle += 90;
        } else {
            angle -= 90;
        }

        // Round off our angle
        // angle = Math.round(angle);
        angle = Math.round(angle);

        // Apply the final angle as a rotation on the arrow. using CSS.
        currentArrow.style.transform = "rotate(" + angle + "deg)"; //for compliant browsers
        currentArrow.style.MozTransform = "rotate(" + angle + "deg)"; //mozilla
        currentArrow.style.WebkitTransform = "rotate(" + angle + "deg)"; //webkit
        currentArrow.style.OTransform = "rotate(" + angle + "deg)"; //opera
        currentArrow.style.MsTransform = "rotate(" + angle + "deg)"; //internet explorer
    }
}


window.addEventListener('load', function() {
    // Call the setup function
    setup();

    // Attach an event listener to the window to detect mouse movements
    document.addEventListener('mousemove', checkMove);

    // Attach an event listener to the window to detect mouse clicks
    document.addEventListener('click', placeArrow);

});

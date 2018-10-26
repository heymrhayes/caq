var navItems = [
  // {"label": "Instructors", "screen": "instructors", "icon": "info"},
  // {"label": "Activities", "screen": "activities", "icon": "info"},
  // {"label": "My Groups", "screen": "groups", "icon": "info"},
  // {"label": "Questions", "screen": "instructors", "icon": "info"},
  // {"label": "About", "screen": "about", "icon": "info"}
];




$(document).ready(function() {

  // initialize all components with auto-init attributes
  window.mdc.autoInit();
  
  // fill the screen
  $("body").css("height", screen.availHeight);
  $("#contentArea").css("height", "100%");
  $("#content").css("height", "100%");
  
  loadDrawerNavigationElements(navItems);

  loadScreen("home");

  // a constant that references MDCDrawer object
  const drawer = $("aside")[0].MDCDrawer;

  // needs to be global, not just inside the doc ready event since we don't invoke until later
  window["dialog"] = $(".mdc-dialog")[0].MDCDialog;


  // open the drawer when the menu icon is clicked
  $(".mdc-top-app-bar__navigation-icon").on("click", function(){
    drawer.open = true;
  });
  
  // close the drawer and load the selected screen
  $("body").on('click', "nav .mdc-list-item", function (event){
    drawer.open = false;
    loadScreen($(this).attr("data-screen"));

  });

});





/**
 * load nav
 * @function
 * @param {array} navItems - array of items for the drawer
 */
function loadDrawerNavigationElements(navItems) {
  $.each(navItems, function(i,v) {
    if (v == "divider") {
        var divider = $("<hr>").addClass("mdc-list-divider");
        $("nav.mdc-list").append(divider);
    } else {    // create and append an anchor to the list
      var a = $("<a>").addClass("mdc-list-item");
      if (v.hasOwnProperty("icon")) {
        var icon = $("<i>").addClass("material-icons mdc-list-item__graphic");
        icon.text(v.icon);
        a.append(icon);
        a.attr("data-screen", v.screen);
      }
      a.append(v.label);
      $("nav.mdc-list").append(a);
    }
    
  });

  $("nav.mdc-list a:eq(0)").addClass("mdc-list-item--activated");

}


/**
 * load screen content via AJAX
 * @function
 * @param {string} screenName - name to load, without _
 */
function loadScreen(screenName) {
  hideRefresh();
  $("#content").load("./screen-content/_" + screenName + ".html", function () {
    console.log("------ Screen load: " + screenName);
  });
}


function setTitle (titleText) {
  $(".mdc-top-app-bar__title").text(titleText);
}


function showLoading(message) {
  $("#loading p").text(message);
  $("#loading").show();
}

function hideLoading() {
   $("#loading p").text("Loading...");
  $("#loading").hide(); 
}

function hideRefresh() {
  $("#refresh").hide();
}


/**
 * show modal dialog
 * @function
 * @param {string} title
 * @param {string} body
 */
function showDialog(title, body) {
  $(".mdc-dialog__title").html(title);
  $(".mdc-dialog__content").html(body);
  window["dialog"].open();
};
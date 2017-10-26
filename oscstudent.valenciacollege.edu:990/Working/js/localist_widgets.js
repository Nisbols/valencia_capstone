// Valencia Localist Events Feed Widgets
// Jeffrey Reed
// Last updated: 6/27/2017

// ===========================================================================
// External helper functions
// ===========================================================================
// From plainJS, make a request and handle CORS properly
// https://plainjs.com/javascript/ajax/making-cors-ajax-get-requests-54/
function getCORS(url, success) {
  var xhr = new XMLHttpRequest();
  if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
  xhr.open('GET', url);
  xhr.onload = success;
  xhr.send();
  return xhr;
}

// ===========================================================================
// My helper functions
// ===========================================================================
// Just pulling this out for my own clarity...
function getCORSResponse(data) {
  // plainJS description notes that some browsers may use one or the other.
  return data.currentTarget.response || data.target.responseText;
}

function getMonthAbbrev(date) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[date.getMonth()]
}

function getMonthName(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[date.getMonth()];
}

function getDayName(date) {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNames[date.getDay()];
}

// Doing anything with times in Javascript is also some tedious BS
function buildTimeString(dateStr) {
  var date = new Date(dateStr);
  var hour = date.getHours();
  var ampm = "";

  // Set AM/PM, change 0 hour to 12...
  if (hour < 12) {
    ampm = "AM";
  } else {
    ampm = "PM";
    hour = hour - 12;
  }
  if (hour == 0) {
    hour = 12;
  }

  // Pad minutes...
  var minutes = date.getMinutes().toString();
  if (minutes.length < 2) {
    minutes = "0" + minutes;
  }

  return hour + ":" + minutes + " " + ampm;
}

function isMidnight(dateStr) {
  return new Date(dateStr).getHours() == 0 ? true : false;
}

// Truncate a string to the last word-boundary before specified length, then add ellipsis
function truncateString(inStr, maxLength) {
  if (typeof maxLength === 'undefined') {
    maxLength = 160;
  }

  var truncDesc = "";

  if (inStr.length > maxLength) {
    // Truncate by length, then split by word break so it's a bit cleaner
    truncDesc = inStr.substring(0, maxLength);
    truncDesc = truncDesc.substring(0, truncDesc.lastIndexOf(" ")) + "...";
  } else {
    truncDesc = inStr;
  }

  return truncDesc;
}

// ===========================================================================
// Create and configure widgets
// ===========================================================================

// Uses data attributes to configure widgets on page, possibly several ones
// Attach a 'data-event-calendar' URL attribute to a div to use
// Attach 'data-event-widget-type' to set style ('basic', 'body', 'home')
function populateEvents() {
  var calendars = document.querySelectorAll('[data-event-calendar]');

  calendars.forEach(function (elem) {
    var widgetType = elem.getAttribute('data-event-widget-type') ? elem.getAttribute('data-event-widget-type') : 'basic';
    makeWidgets(elem.getAttribute('data-event-calendar'), elem, widgetType);
  });
}

function makeWidgets(url, targetElem, widgetType) {
  /* TODO: if we pull in font-awesome (which we are eventually?), we get a spinner for free */
  // targetElem.innerHTML = "<p><i class='fa fa-spinner fa-pulse'></i>Loading...</p>";
  targetElem.innerHTML = "<p>Loading...</p>";

  getCORS(url, function (data) {
    targetElem.innerHTML = '';

    var response = getCORSResponse(data);

    /*  Handle unexpected status codes
        (for now, just abort if you get something that isn't 200 OK) */
    /*  TODO: double-check the whole .currentTarget vs. .target thing
        on ProgressEvent()s */
    if (data.currentTarget.status != 200) {
      console.log(data);

      targetElem.appendChild(
          document.createTextNode("<p>Problem reading from feed.</p>")
      );

      return;
    }

    // Make sure it's JSON, extracted properly, etc.
    // If this bombs (probably because of invalid JSON), show a notice to the user
    try {
      var eventsJSON = JSON.parse(response).events;
    } catch (e) {
      // DEBUG
      console.log(e);

      targetElem.appendChild(
          document.createTextNode("<p>Problem reading from feed.</p>")
      );

      return;
    }

    // Write out into the document
    eventsJSON.forEach(function (elem) {
      var event = elem.event;

      var eventWidget = false;

      if (widgetType == "basic") {
        eventWidget = buildBasicEventWidget(event);
      } else if (widgetType == "home") {
        eventWidget = buildHomeEventWidget(event);
      }

      if (eventWidget) {
        targetElem.appendChild(eventWidget);
      }
      ;
    });
  });
}

// Default "basic" widget
// Returns false if there's an issue reading/creating the widget
function buildBasicEventWidget(event) {
  // Abort if the event for some reason lacks an instance (malformed data)
  if (event.hasOwnProperty("event_instances")) {
    // Creating elements using straight JS is slightly obnoxious.
    var event_instance = event.event_instances[0].event_instance;

    var widget = document.createElement('div');
    widget.classList.add("row");

    var date = new Date(event_instance.start);

    // Skip adding a start time for all-day events
    // Existing code also skips display for events with start time
    // of midnight, so here's a similar check
    // var startTime = "";
    // if(!event_instance.all_day && !isMidnight(event_instance.start)){
    //     startTime = "<br><span class='event_sub'>" + buildTimeString(event_instance.start) + "</span>";
    // }

    widget.innerHTML = "\
            <div class='date_stacked col-md-2'>" + date.getDate() + "<span>" + getMonthAbbrev(date) + "</span> </div>\
            <div class='col-md-10'><a href='" + event.localist_url + "'>" + event.title + "</a></div>\
        ";

    return widget;
  } else {
    return false;
  }
}

// Based on valencia-home-template.html example
function buildHomeEventWidget(event) {
  if (event.hasOwnProperty("event_instances")) {
    var event_instance = event.event_instances[0].event_instance;

    var widget = document.createElement("div");
    widget.classList.add("col-md-4");
    widget.classList.add("col-sm-4");

    // Skip adding a start time for all-day events
    // Existing code also skips display for events with start time
    // of midnight, so here's a similar check
    var startTime = "";
    if (!event_instance.all_day && !isMidnight(event_instance.start)) {
      startTime = "@ " + buildTimeString(event_instance.start);
    }

    // Truncate description to ~4 lines on "smaller" window sizes
    var truncDesc = truncateString(event.description_text);
    var date = new Date(event_instance.start);

    // FIXME: find out if the Localist event feeds we use actually populate the tickets_url param when relevant?
    var eventTickets = "<span class='event_ticket'>get tickets</span>";
    // FIXME: if they populate the Tags field in the event we can fill this in too
    var eventTags = "<div class='tags_normal col-md-6'>valencia arts</div>";

    widget.innerHTML = "\
            <p>\
                <a href='" + event.localist_url + "'> <img src='" + event.photo_url + "' alt='' class='img-responsive'></a>\
            </p>\
            <h3><a href='" + event.localist_url + "'>" + event.title + "</a></h3>\
            <p>" + truncDesc + "</p>\
            <div class='row'> <span class='event_date'>" + getDayName(date) + ", " + getMonthName(date) + " " + date.getDate() + " " + startTime + "</span><span class='event_location'>" + event.location_name + "</span>" + eventTickets + "</div>\
            <hr><div class='row list_news_tabs_more'>" + eventTags + "<div class='tabs_more col-md-6'><a href='#0'><i class='fa fa-long-arrow-right' aria-hidden='true'></i></a></div>\
            </div>\
        ";

    return widget;
  } else {
    return false;
  }
}

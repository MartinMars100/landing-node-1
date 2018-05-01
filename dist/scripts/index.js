'use strict';

$('#bookBtn').click(function() {   // If submit button is clicked
  var locationBuild = '';
  locationBuild += 'https://salonlofts.com/marty_kunsman/schedule'; 
  window.location.href = locationBuild;
}); // end click functioun


$('#contactBtn').click(function() {   // If submit button is clicked
  div_show();
});

$('#contactBtn2').click(function() {   // If submit button is clicked
  div_show();
});

//Function To Display Popup
function div_show() {
  document.getElementById('abc').style.display = "block";
  document.getElementById('header').style.display = 'none';
  document.getElementById('section').style.display = 'none';
  document.getElementById('section2').style.display = 'none';
  document.getElementById('section3').style.display = 'none';
  document.getElementById('name').focus();
}
//Function to Hide Popup 
function div_hide(){
  document.getElementById('abc').style.display = "none";
  document.getElementById('header').style.display = 'block';
  document.getElementById('section').style.display = 'block';
  document.getElementById('section2').style.display = 'block';
  document.getElementById('section3').style.display = 'block';
  document.getElementById('name').focus();
}

$(document).keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13' ){   // If enter key is pressed
    var labelReturn = checkInputs();
    if (labelReturn) {
      // $('label[for="name"]').addClass('error').text("Enter Your Name");
      // labelReturn.addClass('focusBright');
      focusThis();
    } else {
      // sendPrepare();
       // The form will be submitted if the below is true
      if ($('#sendButton').hasClass('sendBright')) {
        // console.log('Fire Node send function');
      } else {
        $('label[for="sendButton"]').addClass('error').text("Please Press Send");
        $("#sendButton").focus();
        $('#sendButton').addClass('sendBright');
        event.preventDefault();
      }
    }
    // event.preventDefault();
  }
});

$('#sendButton').click(function() {
  console.log('send button was clicked');
  var labelReturn = checkInputs();
    if (labelReturn) {
      focusThis();
      event.preventDefault();
    } else {
      // The form will be submitted if the below is true
      if ($('#sendButton').hasClass('sendBright')) {
        console.log('Fire Node send function');
      } else {
        $('label[for="sendButton"]').addClass('error').text("Please Press Send");
        $("#sendButton").focus();
        $('#sendButton').addClass('sendBright');
        event.preventDefault();
      }
    }
});


$("#name").on('change', function() {
  $('#name').removeClass('focusBright');
  $('label[for="name"]').removeClass('error').text('Name:');
});

$("#email").on('change', function() {
  $('#email').removeClass('focusBright');
  $('label[for="email"]').removeClass('error').text('Email:');
});

$("#note").on('change', function() {
  $('#note').removeClass('focusBright');
  $('label[for="note"]').removeClass('error').text('Note:');
});

function checkInputs() {            // Check for next empty field
  var label;
  var nameInput = $("#name").val(); // val is value of what user enters in this field
  if (nameInput === '' || nameInput.length === 0) {   // If the field is empty
    $('label[for="name"]').addClass('error').text("Enter Your Name");
    $('#name').addClass('focusBright');
    label = $('#name');      // Return and change the styling to a white background
    return label;
  } else {
    $('#name').removeClass('focusBright');
    $('label[for="name"]').removeClass('error').text('Name:');
  }

  var emailInput = $("#email").val();  // The filter below checks to see if the email is in a valid format
  var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailInput === '' || !filter.test(emailInput)) {
    $('#email').addClass('focusBright');
    $('label[for="email"]').addClass('error').text("Enter a Valid Email Address");
    label = $('#email');
    return label;
  } else{
    $('#email').removeClass('focusBright');
    $('label[for="email"]').removeClass('error').text('Email:');
  }

  var noteInput = $("#note").val(); // val is value of what user enters in this field
  if (noteInput === '' || noteInput.length === 0) {   // If the field is empty
    $('#note').addClass('focusBright');
    $('label[for="note"]').addClass('error').text("Enter Your Note!");
    label = $('#note');      // Return and change the styling to a white background
    return label;
  } else {
    $('#note').removeClass('focusBright');
    $('label[for="note"]').removeClass('error').text('Note:');
  }
}
  
function focusThis() {
  if ($('label.error').length <  1) {
    $("#sendButton").focus(); // Focus on the submit button
  } else {
      $('label[for="sendButton"]').removeClass('error');
      $(".error:first").focus(); // Focus on the first error or blank field found
  }
}

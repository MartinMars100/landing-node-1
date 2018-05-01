'use strict';

$('#bookBtn').click(function() {   // If submit button is clicked
  var locationBuild = '';
  locationBuild += 'https://salonlofts.com/marty_kunsman/schedule'; 
  window.location.href = locationBuild;
}); // end click functioun


$('#contactBtn').click(function() {   // If submit button is clicked
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
  console.log('a key was pressed');
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13' ){   // If enter key is pressed
    console.log('log enter key was pressed');
    console.log('log keycode = ' + keycode);
    // var labelReturn = checkInputs();
    checkErrors();
    var labelReturn = checkInputs();
    if (labelReturn) {
      labelReturn.addClass('focusBright');
      focusThis();
    } else {
      $("#email").focus();
      event.preventDefault();
      console.log ('Enter Key Ready to submit');
    }
    event.preventDefault();
  }
});

$('#sendButton').click(function() {   // If submit button is clicked
  var labelReturn = checkInputs();
  console.log('log labelReturn = ' + labelReturn);
  if (labelReturn) {
    labelReturn.addClass('focusBright');
  } else {
    console.log ('Ready to submit');
  }
});

$("#name").on('change', function() {
  console.log('log name field was changed');
  $('#name').removeClass('focusBright');
  $('label[for="name"]').removeClass('error').text('Name:');
});

$("#email").on('change', function() {
  console.log('email field has changed');
  $('#email').removeClass('focusBright');
  $('label[for="email"]').removeClass('error').text('Email:');
});

$("#note").on('change', function() {
  console.log('note field has changed');
  $('#note').removeClass('focusBright');
  $('label[for="note"]').removeClass('error').text('Note:');
});

// $("#msg").on('change', function() {
//   console.log('msg field has changed');
//   $('#msg').removeClass('focusBright');
//   $('label[for="message"]').removeClass('error').text('Message:');
// });

function checkInputs() {            // Check for next empty field
  console.log('log checkInputs');
  var label;
  var nameInput = $("#name").val(); // val is value of what user enters in this field
  if (nameInput === '') {    // If the field is empty
    console.log('yes name is blank!');
    label = $('#name');      // Return and change the styling to a white background
    return label;
  } 

  var emailInput = $("#email").val();
  if (emailInput === '') {
    console.log('log emailInput is a space in checkInputs');
    label = $('#email');
    return label;
  }

  var noteInput = $("#note").val(); // val is value of what user enters in this field
  if (noteInput === '') {    // If the field is empty
    console.log('yes note is blank!');
    label = $('#note');      // Return and change the styling to a white background
    return label;
  } 

  // var msgInput = $("#msg").val();
  // if (msgInput === '') {
  //   console.log('The Message Field is blank');
  //   label = $('#msg');
  //   return label;
  // }
  

  label = $('#sendButton');
  return label;


}

function checkErrors() {  // This function runs when enter key is pressed or submit button is clicked
  var nameInput = $("#name").val();  // These errors change the field label to a red message
  if (nameInput === '' || nameInput.length === 0) {
    $('label[for="name"]').addClass('error').text("Enter Your Name");
  } else {
    console.log('log removing class focusBright on name field');
    $('#name').removeClass('focusBright');
    $('label[for="name"]').removeClass('error').text('Name:');
  }
  
  var emailInput = $("#email").val();  // The filter below checks to see if the email is in a valid format
  var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailInput === '' || !filter.test(emailInput)) {
    console.log('log email is spaces or not valid');
    $('label[for="email"]').addClass('error').text("Enter a Valid Email Address");
  } else{
    console.log('log removing class focusBright from email field');
    $('#email').removeClass('focusBright');
    $('label[for="email"]').removeClass('error').text('Email:');
  }

  var noteInput = $("#note").val();  // These errors change the field label to a red message
  if (noteInput === '' || noteInput.length === 0) {
    $('label[for="note"]').addClass('error').text("Enter Your Note!");
  } else {
    console.log('log removing class focusBright on name field');
    $('#note').removeClass('focusBright');
    $('label[for="note"]').removeClass('error').text('Note:');
  }

  // var msgInput = $("#msg").val();  // These errors change the field label to a red message
  // if (msgInput === '' || msgInput.length === 0) {
  //   console.log('log msg field is blank');
  //   $('label[for="message"]').addClass('error').text("Please Enter a Message");
  // } else {
  //   console.log('message field is not blank - removing class focusBright');
  //   $('#msg').removeClass('focusBright');
  //   $('label[for="message"]').removeClass('error').text('Message:');
  // }
}

function focusThis() {
  if ($('label.error').length <  1) {
    console.log('label error length is 0');
    $("#sendButton").focus(); // Focus on the submit button
  } else {
      console.log('log error first focus');
      $(".error:first").focus(); // Focus on the first error or blank field found
      console.log('log error first focus =  ' + $(".error:first"));
  }
}
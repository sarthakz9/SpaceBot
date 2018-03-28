// TODO: Replace with your project's config object. You can find this
// by navigating to your project's console overview page
// (https://console.firebase.google.com/project/your-project-id/overview)
// and clicking "Add Firebase to your web app"
var config = {
  apiKey: "AIzaSyBXQaD_Tbv2QRF2qQnEj6zndbxVSMQcHs4",
  authDomain: "gdgdevfestregister.firebaseapp.com",
  databaseURL: "https://gdgdevfestregister.firebaseio.com",
  projectId: "gdgdevfestregister",
  storageBucket: "",
  messagingSenderId: "774188862758"
};

// Initialize your Firebase app
firebase.initializeApp(config);

// Reference to the entries object in your Firebase database
var entries = firebase.database().ref("gdgdevfestregister");

// Save a new entry to the database, using the input in the form
var submitentry = function () {

  // Get input values from each of the form elements
  var name = $("#name").val();
  var email = $("#email").val();
  var phonenumber = $("#phonenumber").val();
  var githublink = $("#githublink").val();
  if(name==""||email==""||phonenumber=="")
  {

      $('.fai').show();
       return;
}
  $('.fai').hide();
  $('.but').hide();
  $('.suc').show();
  // Push a new entry to the database using those values
  entries.push({
    "name": name,
    "email": email,
    "phonenumber": phonenumber,
    "githublink": githublink
  });
};

var hackentries = firebase.database().ref("gdghackathonregister");

var submitentry2 = function () {

  // Get input values from each of the form elements
  var teamname = $("#teamname").val();
  var nom = $("#nom").val();
  var name = $("#name2").val();
  var email = $("#email2").val();
  var phonenumber = $("#phonenumber2").val();
  var githublink = $("#githublink2").val();
  if(teamname==""||nom==""||nom>3||nom<1||name==""||email==""||phonenumber=="")
  {

      $('.fai').show();
       return;
  }
  $('.fai').hide();
  $('.but').hide();
  $('.suc').show();
  // Push a new entry to the database using those values
  hackentries.push({
       "teamname":teamname,
       "nom":nom,
   "name": name,
   "email": email,
   "phonenumber": phonenumber,
   "githublink": githublink
  });
};

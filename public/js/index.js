  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAi-JrAFXYk6YyKbnacj9V3YyWP-sj4az8",
    authDomain: "platescansystem.firebaseapp.com",
    databaseURL: "https://platescansystem.firebaseio.com",
    projectId: "platescansystem",
    storageBucket: "platescansystem.appspot.com",
    messagingSenderId: "784290014038"
  };
  firebase.initializeApp(config);
  var firestore = firebase.firestore();

  document.getElementById("loginbtn").className = "btn btn-lg btn-primary";
  document.getElementById("loginbtn").innerHTML = 'Login'

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      //document.getElementById("user_div").style.display = "block";
      //document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        //var email_id = user.email;
        firestore.collection("User Informations").doc(user.uid).get().then(function(doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              if(doc.data().Privelage == "Admin"){
                window.location.href='admin';
              }else{
                document.getElementById("errorMessage").className = "text-danger";
                errorText = document.getElementById("errorMessage");
                message = document.createTextNode("No such admin account found!");
                document.getElementById("errorMessage").textContent="";
                errorText.appendChild(message);
                document.getElementById("loginbtn").className = "btn btn-lg btn-primary";
                document.getElementById("loginbtn").innerHTML = 'Login'
                firebase.auth().signOut();
              }
          } else {
            document.getElementById("errorMessage").className = "text-danger";
            errorText = document.getElementById("errorMessage");
            message = document.createTextNode("No such document!");
            document.getElementById("errorMessage").textContent="";
            errorText.appendChild(message);
            document.getElementById("loginbtn").className = "btn btn-lg btn-primary";
            document.getElementById("loginbtn").innerHTML = 'Login'
            firebase.auth().signOut();
              // doc.data() will be undefined in this case
              //console.log("No such document!");
          }
      }).catch(function(error) {
        document.getElementById("errorMessage").className = "text-danger";
        errorText = document.getElementById("errorMessage");
        message = document.createTextNode("Error getting document:"+ error);
        document.getElementById("errorMessage").textContent="";
        errorText.appendChild(message);
        document.getElementById("loginbtn").className = "btn btn-lg btn-primary";
        document.getElementById("loginbtn").innerHTML = 'Login'
        firebase.auth().signOut();
          //console.log("Error getting document:", error);
      });
       // document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

      }
  
    } else {
      // No user is signed in.
  
      //document.getElementById("user_div").style.display = "none";
      //document.getElementById("login_div").style.display = "block";
  
    }
  });
  function login(){
    if (firebase.auth().currentUser) {
        //alert('already logged in!');
        //window.location.href='admin';
      } else {
        document.getElementById("loginbtn").className = "btn btn-lg btn-primary disabled";
        document.getElementById("loginbtn").innerHTML = '<i class="fa fa-spin ion-load-c"></i>';
        var userEmail = document.getElementById("inputEmail").value;
        var userPass = document.getElementById("inputPassword").value;
        if(userEmail.length==0 && userPass.length==0){
          document.getElementById("errorMessage").className = "text-danger";
          errorText = document.getElementById("errorMessage");
          message = document.createTextNode("Please fill up all fields!");
          document.getElementById("errorMessage").textContent="";
          errorText.appendChild(message);
              document.getElementById("loginbtn").className = "btn btn-lg btn-primary";
              document.getElementById("loginbtn").innerHTML = 'Login'
        }else{
          firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        
            if(errorCode == "auth/user-not-found" || errorCode == "auth/wrong-password"){
              document.getElementById("errorMessage").className = "text-danger";
              errorText = document.getElementById("errorMessage");
              message = document.createTextNode("Email or Password is Incorrect!");
              document.getElementById("errorMessage").textContent="";
              errorText.appendChild(message);
                  document.getElementById("loginbtn").className = "btn btn-lg btn-primary";
                  document.getElementById("loginbtn").innerHTML = 'Login'
            }else if(errorCode == "auth/invalid-email"){
              document.getElementById("errorMessage").className = "text-danger";
              errorText = document.getElementById("errorMessage");
              message = document.createTextNode("Please Enter a Valid Email");
              document.getElementById("errorMessage").textContent="";
              errorText.appendChild(message);
                  document.getElementById("loginbtn").className = "btn btn-lg btn-primary";
                  document.getElementById("loginbtn").innerHTML = 'Login'
            }else{
              document.getElementById("loginbtn").className = "btn btn-lg btn-primary";
              document.getElementById("loginbtn").innerHTML = 'Login'
              alert("Error : " + errorMessage + "\nError Code : "+errorCode);
            }
          });
        }
      }
  }
  $(function(){
    $('#inputEmail').on('change keyup paste',function(){
      document.getElementById("errorMessage").className = "text-danger hidden";
  });
  $("#inputPassword").on("change keyup paste", function(){
    document.getElementById("errorMessage").className = "text-danger hidden";
});
});
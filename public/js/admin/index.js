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

  //const docRef = firestore.collection("Count").doc("PlateNumberCount");
  const docRefPlate = firestore.doc("Count/PlateNumberCount");
  const docRefUser = firestore.doc("Count/UserCount");
  const docRefLog = firestore.doc("Count/LogCount");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      //document.getElementById("user_div").style.display = "block";
      //document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
        var nameuser = user.displayName;
       document.getElementById("user_name_side").textContent=nameuser;
       document.getElementById("user_name_side_mobile").textContent=nameuser;
       docRefPlate.get().then(function (doc){
           if(doc && doc.exists){
               const data = doc.data();
               document.getElementById("plateNo").textContent=data.count;
           }
       }).catch(function (error){
           //window.alert("Error: "+error);
           console.log("Error : ",error);
       });
       docRefUser.get().then(function (doc){
        if(doc && doc.exists){
            const data = doc.data();
            document.getElementById("userNo").textContent=data.count;
        }
    }).catch(function (error){
        //window.alert("Error: "+error);
        console.log("Error : ",error);
    });
    docRefLog.get().then(function (doc){
      if(doc && doc.exists){
          const data = doc.data();
          document.getElementById("logNo").textContent=data.count;
      }
  }).catch(function (error){
      //window.alert("Error: "+error);
      console.log("Error : ",error);
  });
      }
  
    } else {
        window.location.href='../';
    }
  });  
  function logout(){
    firebase.auth().signOut();
    window.location.href='../';
  }
  function changepass(){
    if(confirm("Change Password?")){
      firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email).then(function() {
        alert("Change password instructions sent to your email : "+firebase.auth().currentUser.email);
      }).catch(function(error) {
       alert("Error has occured : "+error);
      });
    }
      }
  function editInfo(){
    var newName = document.getElementById("ename").value;
    document.getElementById("user_name_side").textContent=newName;
    document.getElementById("user_name_side_mobile").textContent=newName;

    firebase.auth().currentUser.updateProfile({
  displayName: newName,
}).then(function() {
  firestore.collection("User Informations").doc(firebase.auth().currentUser.uid).update({
    Name: newName
}).then(function(){
  alert("Updated successfully");
  document.getElementById("user_name_side").textContent=newName;
  document.getElementById("user_name_side_mobile").textContent=newName;
}).catch(function(error){
    console.log("Error: ",error);
    alert("Error has occured : "+error);
});
}).catch(function(error) {
alert("Error has occured : "+error);
});

  }
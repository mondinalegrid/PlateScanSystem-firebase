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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      if(user != null){
        var nameuser = user.displayName;
       document.getElementById("user_name_side").textContent=nameuser;
       document.getElementById("user_name_side_mobile").textContent=nameuser;
//document.getElementById("list-logs").innerHTML ='<div class="list-group-item"><a href="javascript:;" class="pull-right confirmdellog" title="Delete Log"><i class="fa fa-fw ion-android-close text-danger"></i></a><span class="badge"></span><i class="ion-clipboard"></i></div><nav aria-label="Page navigation"><ul class="pagination justify-content-end hidden-xs"><li class="page-item"><a class="page-link" href="" tabindex="-1">Previous</a></li>';  
       firestore.collection("Audit Log").orderBy("timestamp","desc").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
         if(doc && doc.exists){
             const myData = doc.data();
             document.getElementById("list-logs").innerHTML += '<div id="'+doc.id+'" class="list-group-item"><a href="javascript:;" onclick=delLog("'+doc.id+'") class="pull-right confirmdellog" title="Delete Log"><i class="fa fa-fw ion-android-close text-danger"></i></a><span class="badge">'+myData.timestamp+'</span><i class="ion-clipboard"></i> '+myData.log+'</div>';  
         }
        });
    }).catch(function(error){
     console.log("Error getting documents: ", error);
    });
    document.getElementById("loading-div").remove();
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
function delLog(docID){
    var confirmation = confirm('Delete Log?');
    if(confirmation){
      firestore.collection("Audit Log").doc(docID).delete().then(function() {
        document.getElementById("showStatus").className="alert alert-success alert-dismissable fade in";
        document.getElementById("messageStatus").textContent="Successfully deleted log";

        document.getElementById(docID).remove();

        firestore.collection("Count").doc("LogCount").get().then(snap => {
          firestore.collection("Count").doc("LogCount").update({count: snap.data().count - 1});
          return;
      });
    }).catch(function(error) {
        document.getElementById("showStatus").className="alert alert-danger alert-dismissable fade in";
        document.getElementById("messageStatus").textContent="Error has occured :"+error;
    });
    }
    return false;
}
function hideStatus(){
    document.getElementById("showStatus").className="alert alert-danger alert-dismissable fade in hidden";
    document.getElementById("messageStatus").textContent="";
  }
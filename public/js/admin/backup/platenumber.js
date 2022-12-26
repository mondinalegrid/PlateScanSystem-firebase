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
  //const docRefPlate = firestore.doc("Plate Number");
  var t = $('#sortablecustom').DataTable({
    'paging'      : false,
    'lengthChange': false,
    'searching'   : true,
    'ordering'    : true,
    'info'        : false,
    'autoWidth'   : true
});
var rowCounter= 0;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var user = firebase.auth().currentUser;
      if(user != null){
        var email_id = user.displayName;
       document.getElementById("user_name_side").textContent=email_id;
       document.getElementById("user_name_side_mobile").textContent=email_id;
      
    var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    if (isMobile) {  
     // This jQuery Plugin will disable text selection for Android and iOS devices.
     $.fn.extend({
         disableSelection: function() {
             this.each(function() {
                 this.onselectstart = function() {
                     return false;
                 };
                 this.unselectable = "on";
                 $(this).css('-moz-user-select', 'none');
                 $(this).css('-webkit-user-select', 'none');
             });
         }
     });
     $('.notSelectable').disableSelection();
      var onlongtouch; 
      var timer, lockTimer;
      var touchduration = 800; //length of time we want the user to touch before we do something
      
      function touchstart(e) {
        e.preventDefault();
        if(lockTimer){
          return;
        }
          timer = setTimeout(onlongtouch, touchduration); 
        lockTimer = true;
      }
      
      function touchend() {
          //stops short touches from firing the event
          if (timer){
              clearTimeout(timer); // clearTimeout, not cleartimeout..
          lockTimer = false;
        }
      }
      
      onlongtouch = function() { 
       alert(this.textContent);
      };
      
        window.addEventListener("touchstart", touchstart, false);
        window.addEventListener("touchend", touchend, false);
    }else{
        $('#sortablecustom tbody').on('dblclick', 'td', function () {
            //pc,laptop etc
            //var data = t.row( $(this).closest('tr') ).data();
            var data = t.row(this).data();
            //var head = t.head(this).data();

            var index = $(this).index()+1;
            //var $td = $(this);
            //var head = $td.closest('table').find('th').eq($td.index());

            //var index = $(this).index()+1;
           // alert( 'You clicked on '+data[0]+'\'s row' ); 
           //var tdIndex = $(this).index() + 1;
           //var head = $('#table tr').find('th:nth-child(' + tdIndex + ')');
           //alert( 'You clicked on '+this.textContent+'\'s row' );
           if(this.textContent!=data[0]&&this.textContent!=data[1]){
               //alert("head: "+head[4]+"\nindex: "+index);
               //alert($(this).find("td:eq(0) input[type='text']").val());
               //alert($('#sortablecustom tr').find('th:nth-child(' + index + ')'));
            var idx = t.cell( this ).index().column;
            var title = t.column( idx ).header();
            var table_field=$(title).html();
            
            var text = this.textContent;
            var width = this.offsetWidth;
            var height = this.offsetHeight;
            //this.textContent="";
            //this.innerHTML = '<input id="edit_box" type="text" value="'+text+'" style="width:'+width+'px; height:'+height+'px;"></input>';
            this.innerHTML = '<input id="field_Name" value="'+table_field+'" class="hidden"></input><input id="doc_Name" value="'+data[1]+'" class="hidden"></input><input id="prev_Val" value="'+text+'" class="hidden"></input><textarea id="edit_box" type="text" style="width:'+width+'px; height:'+height+'px;">'+text+'</textarea>';
          }
        });
    }

    if (isMobile) {

    }else{
      window.addEventListener('click', function(e){   
        if (document.getElementById('sortablecustom').contains(e.target)){
          //alert("clicked inside");
          //var hide = $("#sortablecustom :input");
          if(document.getElementById('edit_box')!=e.target){
           // $('#edit_box').insertBefore('<i class="fa fa-spin ion-load-c"></i>');
            var prevVal = $('#prev_Val').val();
            var newVal = $('#edit_box').val();
            var docName = $('#doc_Name').val();
            var field = $('#field_Name').val();
            if(prevVal!=newVal){
                //alert("new val");
                //var update = {};
                //update[$('#field_Name').val()] = newVal
firestore.collection("Plate Number").doc(docName).update({
    [field]: newVal
}).then(function(){
    $('#field_Name').remove();
    $('#doc_Name').remove();
    $('#prev_Val').remove();
    $('#edit_box').replaceWith(newVal);
    document.getElementById("showStatus").className="alert alert-success alert-dismissable fade in";
    document.getElementById("messageStatus").textContent="Updated "+docName+" "+field;
}).catch(function(error){
    console.log("Error: ",error);
    $('#field_Name').remove();
    $('#doc_Name').remove();
    $('#prev_Val').remove();
    $('#edit_box').replaceWith(prevVal);
    document.getElementById("showStatus").className="alert alert-danger alert-dismissable fade in";
    document.getElementById("messageStatus").textContent="Error has occured :"+error;
});
            }else{
              //alert("firing already");
                $('#field_Name').remove();
                $('#doc_Name').remove();
                $('#prev_Val').remove();
                $('#edit_box').replaceWith(prevVal);
            }
            //$('#edit_box').remove();
            //document.getElementById('edit_box').className="hidden";
            //document.getElementById('edit_box').innerHTML=text;
            //document.getElementById('edit_box').textContent=text;
          }
        } else{
            //alert("clicked outside");
             if(document.getElementById('edit_box')!=e.target){
               // $('#edit_box').insertBefore('<i class="fa fa-spin ion-load-c"></i>');
                var prevVal = $('#prev_Val').val();
                var newVal = $('#edit_box').val();
                var docName = $('#doc_Name').val();
                var field = $('#field_Name').val();
                if(prevVal!=newVal){
    firestore.collection("Plate Number").doc(docName).update({
        [field]: newVal
    }).then(function(){
        $('#field_Name').remove();
        $('#doc_Name').remove();
        $('#prev_Val').remove();
        $('#edit_box').replaceWith(newVal);
        document.getElementById("showStatus").className="alert alert-success alert-dismissable fade in";
        document.getElementById("messageStatus").textContent="Updated "+docName+" "+field;
    }).catch(function(error){
        console.log("Error: ",error);
        $('#field_Name').remove();
        $('#doc_Name').remove();
        $('#prev_Val').remove();
        $('#edit_box').replaceWith(prevVal);
        document.getElementById("showStatus").className="alert alert-danger alert-dismissable fade in";
        document.getElementById("messageStatus").textContent="Error has occured :"+error;
    });
                }else{
                    $('#field_Name').remove();
                    $('#doc_Name').remove();
                    $('#prev_Val').remove();
                    $('#edit_box').replaceWith(prevVal);
                }
              }
        }
      });
    }
       firestore.collection("Plate Number").get().then(function(querySnapshot){
           querySnapshot.forEach(function(doc){
            if(doc && doc.exists){
                const myData = doc.data();
                rowCounter=rowCounter+1;
                //var rowNode = 
                t.row.add([
                        rowCounter,
                        doc.id,
                        myData['LTO Alarm'],
                        myData['LTO Apprehension'],
                        myData.Date,
                        myData['Body Type'],
                        myData.Color,
                        myData['MV File No'],
                        myData.Make,
                        myData['Owners Name'],
                        myData.Series,
                        myData['Year Model']
                    ]).draw(false);
                    //.node();
                    //$( rowNode ).find('td').addClass('notSelectable');
            }
           });
       }).catch(function(error){
        console.log("Error getting documents: ", error);
       });

      }
  
    } else {
        window.location.href='../index.html';
    }
  });  
  function logout(){
    firebase.auth().signOut();
    window.location.href='../index.html';
  }
  function hideStatus(){
    document.getElementById("showStatus").className="alert alert-danger alert-dismissable fade in hidden";
    document.getElementById("messageStatus").textContent="";
  }
  function addData(){
    document.getElementById("modalAddBtn").className="btn btn-primary disabled";
    var docName = document.getElementById("plateNumAdd").value;
    var bodyType = document.getElementById("bodyTypeAdd").value;
    var color = document.getElementById("colorAdd").value;
    var date = document.getElementById("dateAdd").value;
    var ltoAlarm = document.getElementById("ltoAlarmAdd").value;
    var ltoApprehension = document.getElementById("ltoAppAdd").value;
    var mvFileNo = document.getElementById("mvFileNoAdd").value;
    var make = document.getElementById("makeAdd").value;
    var ownersName = document.getElementById("ownerAdd").value;
    var series = document.getElementById("seriesAdd").value;
    var yearModel = document.getElementById("yearAdd").value;

    firestore.collection("Plate Number").doc(docName).set({
      ['Body Type']: bodyType,
      Color: color,
      Date: date,
      ['LTO Alarm']: ltoAlarm,
      ['LTO Apprehension']: ltoApprehension,
      ['MV File No']: mvFileNo,
      Make: make,
      ['Owners Name']: ownersName,
      Series: series,
      ['Year Model']: yearModel
  }).then(function() {
    t.row.add([
      rowCounter,
      docName,
      ltoAlarm,
      ltoApprehension,
      date,
      bodyType,
      color,
      mvFileNo,
      make,
      ownersName,
      series,
      yearModel
  ]).draw(false);
    document.getElementById("showStatus").className="alert alert-success alert-dismissable fade in";
    document.getElementById("messageStatus").textContent="Added "+docName;
    document.getElementById("modalAddBtn").className="btn btn-primary";
      console.log("Document successfully written!");
      firestore.collection("Count").doc("PlateNumberCount").get().then(snap => {
        firestore.collection("Count").doc("PlateNumberCount").update({count: snap.data().count + 1});
        return;
    });
  }).catch(function(error) {
    document.getElementById("modalAddBtn").className="btn btn-primary";
    document.getElementById("showStatus").className="alert alert-success alert-dismissable fade in";
    document.getElementById("messageStatus").textContent="Error has occured :"+error;
      console.error("Error writing document: ", error);
  });
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
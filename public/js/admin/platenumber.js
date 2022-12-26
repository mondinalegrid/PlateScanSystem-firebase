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
    var onlongtouch;
    var timer, locktimer;
    var touchduration = 800; //lenght of time user click
    if (isMobile) {  
      function touchstart(e){
        e.preventDefault();
        if(locktimer){
          return;
        }
        timer = setTimeout(onlongtouch, touchduration);
        locktimer = true;
      }
      function touchend(){
        //stops short touches from firing the event
        if(timer){
          clearTimeout(timer);
          locktimer=false;
        }
      }
      onlongtouch = function(){
       alert("long touch");
            //mobile
           //alert( 'You clicked on '+this.textContent+'\'s row' );
           var data = t.row(this).data();
           var index = $(this).index()+1;

          if(this.textContent!=data[0]&&this.textContent!=data[1]){
            
           var idx = t.cell( this ).index().column;
           var title = t.column( idx ).header();
           var table_field=$(title).html();
           
           var text = this.textContent;
           var width = this.offsetWidth;
           var height = this.offsetHeight;
           var docNameText = data[1];
           var docNameSplit =  docNameText.split("<");
           this.innerHTML = '<input id="field_Name" value="'+table_field+'" class="hidden"></input><input id="doc_Name" value="'+docNameSplit+'" class="hidden"></input><input id="prev_Val" value="'+text+'" class="hidden"></input><textarea id="edit_box" type="text" style="width:'+width+'px; height:'+height+'px;">'+text+'</textarea>';
          }
      }
    }else{
        $('#sortablecustom tbody').on('dblclick', 'td', function () {
            //pc,laptop etc
            //var data = t.row( $(this).closest('tr') ).data();
            if($('#edit_box').val()!=null){
              //sum extra validation
              var prevVal = $('#prev_Val').val();
              $('#field_Name').remove();
              $('#doc_Name').remove();
              $('#prev_Val').remove();
              $('#edit_box').replaceWith(prevVal);
            }else{
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
             if(this.textContent!=data[0]&&this.textContent!=data[1]&&index!=1&&index!=2){
                 //alert("head: "+head[4]+"\nindex: "+index);
                 //alert($(this).find("td:eq(0) input[type='text']").val());
                 //alert($('#sortablecustom tr').find('th:nth-child(' + index + ')'));
              var idx = t.cell( this ).index().column;
              var title = t.column( idx ).header();
              var table_field=$(title).html();
              
              var text = this.textContent;
              var width = this.offsetWidth;
              var height = this.offsetHeight;
              var docNameText = data[1];
              var docNameSplit =  docNameText.split("<");
              //this.textContent="";
              //this.innerHTML = '<input id="edit_box" type="text" value="'+text+'" style="width:'+width+'px; height:'+height+'px;"></input>';
              this.innerHTML = '<input id="field_Name" value="'+table_field+'" class="hidden"></input><input id="doc_Name" value="'+docNameSplit[0]+'" class="hidden"></input><input id="prev_Val" value="'+text+'" class="hidden"></input><textarea id="edit_box" type="text" style="width:'+width+'px; height:'+height+'px;">'+text+'</textarea>';
            } 
            }
        });
    }
    if(isMobile){
      document.addEventListener("DOMContentLoaded", function(event){
        window.addEventListener("touchstart", touchstart, false);
        window.addEventListener("touchend", touchend, false);
      });
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
                        doc.id + '<a href="javascript:;" onclick=delRow("'+doc.id+'","'+rowCounter+'") class="pull-right" title="Delete '+doc.id+'"><i class="fa fa-fw ion-android-close text-danger"></i></a>',
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
        window.location.href='../';
    }
  });  
  function logout(){
    firebase.auth().signOut();
    window.location.href='../';
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
    rowCounter=rowCounter+1;

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
      docName + '<a href="javascript:;" onclick=delRow("'+docName+'","'+rowCounter+'") class="pull-right" title="Delete '+docName+'"><i class="fa fa-fw ion-android-close text-danger"></i></a>',
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
      //console.log("Document successfully written!");
      firestore.collection("Count").doc("PlateNumberCount").get().then(snap => {
        firestore.collection("Count").doc("PlateNumberCount").update({count: snap.data().count + 1});
        return;
    });
    firestore.collection("Audit Log").doc().set({
      timestamp: new Date().toLocaleString("en-US"),
      log: "Admin : "+firebase.auth().currentUser.displayName+" | Added Plate Number : "+docName
  }).then(function() {
    firestore.collection("Count").doc("LogCount").get().then(snap => {
      firestore.collection("Count").doc("LogCount").update({count: snap.data().count + 1});
      return;
  });
  }).catch(function(error) {
    document.getElementById("modalAddBtn").className="btn btn-primary";
    document.getElementById("showStatus").className="alert alert-success alert-dismissable fade in";
    document.getElementById("messageStatus").textContent="Error has occured :"+error;
  });

  }).catch(function(error) {
    document.getElementById("modalAddBtn").className="btn btn-primary";
    document.getElementById("showStatus").className="alert alert-success alert-dismissable fade in";
    document.getElementById("messageStatus").textContent="Error has occured :"+error;
      //console.error("Error writing document: ", error);
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
function delRow(platenumber,rowNumDel){
  var confirmation = confirm('Delete '+platenumber+'?');
  if(confirmation){
    firestore.collection("Plate Number").doc(platenumber).delete().then(function() {
      //console.log("Document successfully deleted!");
      document.getElementById("showStatus").className="alert alert-success alert-dismissable fade in";
      document.getElementById("messageStatus").textContent="Successfully deleted: "+platenumber;
      //t.row(':eq('+rowNum-1+')').remove().draw(false);
      var rowIndexNum = rowNumDel - 1;
      t.row(':eq('+rowIndexNum+')').remove().draw(false);
      firestore.collection("Count").doc("PlateNumberCount").get().then(snap => {
        firestore.collection("Count").doc("PlateNumberCount").update({count: snap.data().count - 1});
        return;
    });
    firestore.collection("Audit Log").doc().set({
      timestamp: new Date().toLocaleString("en-US"),
      log: "Admin : "+firebase.auth().currentUser.displayName+" | Deleted Plate Number : "+platenumber
  }).then(function() {
    firestore.collection("Count").doc("LogCount").get().then(snap => {
      firestore.collection("Count").doc("LogCount").update({count: snap.data().count + 1});
      return;
  });
  }).catch(function(error) {
    document.getElementById("modalAddBtn").className="btn btn-primary";
    document.getElementById("showStatus").className="alert alert-success alert-dismissable fade in";
    document.getElementById("messageStatus").textContent="Error has occured :"+error;
  });
  }).catch(function(error) {
      //console.error("Error removing document: ", error);
      document.getElementById("showStatus").className="alert alert-danger alert-dismissable fade in";
      document.getElementById("messageStatus").textContent="Error has occured :"+error;
  });
  }
  return false;
}
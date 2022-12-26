$(function(){
    //add active link on menu
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
    if(filename){
        $('.side-nav li').removeClass('active');
    }
    $('.side-nav li a[href="'+filename+'"]').parent("li").addClass('active');
    if(filename=='logs.php'){
        $('.side-nav li a[href="logs.php?page=1"]').parent("li").addClass('active');
    }
if($(window).width() <= 767){
  }else{
    if(filename=='users.php' || filename=='edit.html' || filename=='changepass.php'){
        $('.collapse').collapse()
    }
  }
    //confirmation when click
    $('.confirmation').on('click',function(){
        var confirmation = confirm('Are you sure to delete this RECORD');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmdelstudclass').on('click',function(){
        var confirmation = confirm('Delete Student from Class ?');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmclass').on('click',function(){
        var confirmation = confirm('Delete Class ?');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmsubject').on('click',function(){
        var confirmation = confirm('Delete Subject ?\n\nNote : \nThat this also deletes the class associated with the subject');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmstudent').on('click',function(){
        var confirmation = confirm('Delete Student ?\n\nNote : \nThat this also deletes the students login credentials');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmteacher').on('click',function(){
        var confirmation = confirm('Delete Teacher ?\n\nNote : \nThat this deletes the teacher from the class its associated with\nThis also deletes the teachers login credentials');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmuser').on('click',function(){
        var confirmation = confirm('Delete User ?\n\nNote : \nThis only Deletes the User\'s Login Credentials');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmremoveteach').on('click',function(){
        var confirmation = confirm('Remove Teacher From Class?');
        if(confirmation){
            return true;   
        }
        return false;
    });
    
    //confirm adding acc
    $('.confirmacc').on('click',function(){
        var confirmation = confirm('Create LOGIN ACCOUNT?');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmaccstud').on('click',function(){
        var confirmation = confirm('Create Student Login Account?');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmaccsteach').on('click',function(){
        var confirmation = confirm('Create Teacher Login Account?');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmreset').on('click',function(){
        var confirmation = confirm('Reset Password of User?');
        if(confirmation){
            return true;   
        }
        return false;
    });
    $('.confirmdellog').on('click',function(){
        var confirmation = confirm('Delete Log?');
        if(confirmation){
            return true;   
        }
        return false;
    });
    
});
$(document).ready(function() {
    $('.modal').on('hidden.bs.modal', function(e)
    { 
        $(this).removeData();
    }) ;

    function updateYear()
    {
        var length = $("#yearstud").val().length;
        if(length>3){
          var newyr = parseInt($("#yearstud").val()) + 1;
          $("#nxtyearstud").val(newyr);
        }
    }
    $(document).on("change, keyup", "#yearstud", updateYear);
    $('#sortable').DataTable({
        'paging'      : false,
        'lengthChange': false,
        'searching'   : true,
        'ordering'    : true,
        'info'        : false,
        'autoWidth'   : true
      });
      $('#firstsortable').DataTable({
        'paging'      : false,
        'lengthChange': false,
        'searching'   : true,
        'ordering'    : true,
        'info'        : false,
        'autoWidth'   : true
      });
      $('#secsortable').DataTable({
        'paging'      : false,
        'lengthChange': false,
        'searching'   : true,
        'ordering'    : true,
        'info'        : false,
        'autoWidth'   : true
      });
      $('#nosearchsortable').DataTable({
        'paging'      : false,
        'lengthChange': false,
        'searching'   : false,
        "order": [[ 2, "asc" ]],
        'ordering'    : true,
        'info'        : false,
        'autoWidth'   : true
      });
} );
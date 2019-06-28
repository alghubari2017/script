$(document).ready(function(){
     
  var arr = []; // List of users 
 var uar =[];
 
 setInterval(function(){
 update_last_activity(); 
fetch_friend();

 
  },5000);
 
 $(document).on('click', '.msg_head', function() { 
  var chatbox = $(this).parents().attr("rel") ;
  $('[rel="'+chatbox+'"] .msg_wrap').slideToggle('slow');
  return false;
 });
 
 
 $(document).on('click', '.close', function() { 
  var chatbox = $(this).parents().parents().attr("rel") ;
  $('[rel="'+chatbox+'"]').hide();
  arr.splice($.inArray(chatbox, arr), 1);
  displayChatBox();
  return false;
 });
 
 $(document).on('click', '#sidebar-user-box', function() {
 
  var userID = $(this).attr("class");
  var uID = $(this).attr("ruid");
  var username = $(this).children().text() ;
  
  if ($.inArray(userID, arr) != -1)
  {
      arr.splice($.inArray(userID, arr), 1);
     }
  
  arr.unshift(userID);
  chatPopup =  '<div class="msg_box" style="right:270px" ruid="'+ uID +'" rel="'+ userID +'">'+
     '<div class="msg_head">'+username +
     '<div class="close">x</div> </div>'+
     '<div class="msg_wrap"> <div class="msg_body"> <div class="msg_push'+ userID +'"></div> </div>'+
     '<div class="msg_footer"><textarea class="msg_input" rows="4"></textarea></div>  </div>  </div>' ;     
    
     $("body").append(  chatPopup  );
  displayChatBox();
  display_message(uID,userID);
 });
 
 
 function load_data(msg,uiD,userID)
	{
		$.ajax({
			url:"insertChat.php",
			method:"post",
			data:{fuid:uiD,touid:userID,messge:msg},
			
		});
	}
	
	function display_message(uiD,userID)

	{
		
		$.ajax({
			url:"displaychat.php",
			method:"post",
			data:{fuid:uiD,touid:userID},
			success:function(data)
			{
				$('.msg_push'+userID).html(data);
			}
		});
	}
 
 function update_last_activity(){
	 
$.ajax({
			url:"update_last_activity.php",
			success:function()
			{
				
			}
			
		});	 
 }

 
 function fetch_friend(){
	 
$.ajax({
			url:"contact.php",
			
      success:function(){
     
		//$('.fetchfriend').html('');
		
				
			}
			
		});	 
 }
 $(document).on('keypress', 'textarea' , function(e) { 

        if (e.keyCode == 13 ) {   
            var msg = $(this).val();  
   $(this).val('');
    var userID = $(".msg_box").attr("rel");
	 var uiD = $(".msg_box").attr("ruid");
	
 //  var username = $(this).parents().parents().parents().attr("class").nextSibling();
   var oldStr = $(".msg_box").children(".msg_head").text();
  // var username  = oldStr.substr(0, oldStr.length-2);
  var username = uiD;
   if(msg.trim().length != 0){ 
   	
   	
     load_data(msg,uiD,userID);
	
   var chatbox = $(this).parents().parents().parents().attr("rel") ;
  $('<div class="msg-right">'+msg+'</div>').insertBefore('[rel="'+chatbox+'"] .msg_push');
   $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
   // display_message(uID,userID);
   }
   
        }
    });
 
  
    
 function displayChatBox(){ 
     i = 270 ; // start position
  j = 260;  //next position
  
  $.each( arr, function( index, value ) {  
     if(index < 4){
          $('[rel="'+value+'"]').css("right",i);
    $('[rel="'+value+'"]').show();
       i = i+j;    
     }
     else{
    $('[rel="'+value+'"]').hide();
     }
        });  
 }  
 
});
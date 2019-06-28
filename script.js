$(document).ready(function(){
	
 
  var arr = []; // List of users 


 setInterval(function(){
 update_last_activity(); 

 load_unseen_notification();
 
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
  var userimg = $(this).attr("imgid");

  
  if ($.inArray(userID, arr) != -1)
  {
      arr.splice($.inArray(userID, arr), 1);
     }
  
  arr.unshift(userID);
  chatPopup =  '<div class="msg_box" style="right:270px" ruid="'+uID+'" rel="'+userID+'">'+
     '<div class="msg_head">'+username +
     '<div class="close"> x  </div></div>'+
     '<div class="msg_wrap"> <div class="msg_body"> <div class="msg_push'+userID+'"></div> </div>'+
     '<div class="msg_footer"><textarea  class="msg_input" rows="4"></textarea></div>  </div>  </div>' ;     
    
     $("body").append(  chatPopup  );

  displayChatBox();
  
 
 
 
 
 });
 
 
 
 
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
 
 
 
 function load_data(msg,uiD,user)
	{
		$.ajax({
			url:"insertChat.php",
			method:"post",
			data:{fuid:uiD,touid:user,messge:msg},
			success:function(data)
			{
			 
   	
				
			}
			
		});
	}
	function update_ReadMessage(user)
	{
		$.ajax({
			url:"readMessage.php",
			method:"post",
			data:{touid:user},
			success:function(data)
			{
			$('.msg_push'+user).append(data);  
   	
			}
			
		});
	}
	
	function display_message(userID)

	{
		
		$.ajax({
			url:"displaychat.php",
			method:"post",
			data:{touid:userID},
			success:function(data)
			{
			  
 $('.msg_push'+userID).html(''); 
 //$('.msg-right').html('');
// $('.msg-left').html('').hide(); 
  $('.msg_push'+userID).append(data); 

   var objDiv = $('.msg_body');
    if (objDiv.length > 0){
       
		 var height = objDiv[0].scrollHeight;
 objDiv.scrollTop(height);
    }  
   
				
			}
		});
	}
	

	function update_display_message(userID)

	{
	 
  $('msg_push'+userID).each(function(){
	 var to_user_id = $(this).data('touid');
    display_message(to_user_id);
	
  });    
   
				
			
		
	}
	 
		 
 $(document).on('click','textarea',function(){
		 var user = $(this).parents().parents().parents().attr("rel"); 
        if ($(this).is(":focus")) {
         update_ReadMessage(user);
		
        }
 });
 
 $(document).on('keypress', 'textarea' , function(e) {
 	 

        if (e.keyCode == 13 ) {   
	
            var msg = $(this).val();  
   $(this).val('');
  // var user =arr[0];
 
	 var uiD = $(".msg_box").attr("ruid");
	
 //  var username = $(this).parents().parents().parents().attr("class").nextSibling();
   var oldStr = $(".msg_box").children(".msg_head").text();
  // var username  = oldStr.substr(0, oldStr.length-2);
  var username = uiD;
   if(msg.trim().length != 0){ 
   var user = $(this).parents().parents().parents().attr("rel");
   	
     load_data(msg,uiD,user);
	
   var chatbox = $(this).parents().parents().parents().attr("rel") ;

  //$('<div class="msg-right"></div>').insertAfter('[rel="'+chatbox+'"] .msg_push'+user+'');
  
   var objDiv = $('.msg_body');
    if (objDiv.length > 0){
       
		 var height = objDiv[0].scrollHeight;
 objDiv.scrollTop(height);
    }

   //display_message(uID,user);
    // alert(user);
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


 function load_unseen_notification(view = '')
 {
  $.ajax({
   url:"unReadMessage.php",
   method:"POST",
   data:{view:view},
   dataType:"json",
   success:function(data)
   {
    $('.dropdown-menu').html(data.notification);
    if(data.unseen_notification > 0)
    {
     $('.count').html(data.unseen_notification);
    }
   }
  });
 }
 
  $(document).on('click', '.dropdown-toggle', function(){
  $('.count').html('');
  load_unseen_notification('yes');
 });
 


 
 


 

});
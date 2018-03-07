$(document).ready(function() {
	$("#tab_bar").show();
	$("#content_list").hide();
  $("#content_add").hide();
	$("#content_about").hide();
	/*$("#test_gestures").hide();*/

  $("#dialer").click(function() {
    $("#content_dialer").show();
    $("#content_list").hide();
    $("#content_add").hide();
		$("#content_about").hide();
		/*$("#test_gestures").hide();*/
  });

  $("#list").click(function() {
    $("#content_list").show();
    $("#content_add").hide();
    $("#content_dialer").hide();
		$("#content_about").hide();
		/*$("#test_gestures").hide();*/
  });

  $("#add").click(function() {
    $("#content_add").show();
    $("#content_list").hide();
    $("#content_dialer").hide();
		$("#content_about").hide();
		/*$("#test_gestures").hide();*/
  });

	$("#about").click(function() {
		$("#content_about").show();
    $("#content_add").hide();
    $("#content_list").hide();
    $("#content_dialer").hide();
		/*$("#test_gestures").hide();*/
  });

	/*$("#gesture").click(function() {
		$("#test_gestures").show();
    $("#add_content").hide();
    $("#content_list").hide();
    $("#content_dialer").hide();
  });*/

	$('.number-dig').click(function() {
		var currentValue = $('.pure-input-1-2 input').val();
		var valueToAppend = $(this).attr('name');
		$('.pure-input-1-2 input').val(currentValue + valueToAppend);

	});

	$('.action-dig').click(function() {
		if($(this).hasClass('goBack')) {
			var currentValue = $('.pure-input-1-2 input').val();
			var newValue = currentValue.substring(0,
				currentValue.length - currentValue.length);
			$('.pure-input-1-2 input').val(newValue);
		}
		else if ($(this).hasClass('dial')) {
			var link = "tel:3035885799";
			window.location.href = link;
		}
	});
	/* gesture area */
	/*
	startX = 0;
	startY = 0;
	endX = 0;
	endY = 0;

	$("#gesture_area").mousedown(function(event) {
		startX = event.pageX;
		startY = event.pageY;
		$("#gesture_output").text("mouse down")
	});

	$("#gesture_area").mouseup(function(event) {
		endX = event.pageX;
		endY = event.pageY;

		if (endX > startX) {
			$("#gesture_output").text("swipe right");
		} else if (endX < startX) {
			$("#gesture_output").text("swipe left");
		} else {
			$("#gesture_output").text("mouse up");
		}
	});*/
});

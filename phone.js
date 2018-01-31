$(document).ready(function() {
	$("#tab_bar").show();
	$("#content_list").hide();
  $("#add_content").hide();

  $("#dialer").click(function() {
    $("#content_dialer").show();
    $("#content_list").hide();
    $("#add_content").hide();
  });

  $("#list").click(function() {
    $("#content_list").show();
    $("#add_content").hide();
    $("#content_dialer").hide();
  });

  $("#add").click(function() {
    $("#add_content").show();
    $("#content_list").hide();
    $("#content_dialer").hide();
  });
});


$(document).ready(function() {
  $("#partOne").show();
  $("#partTwo").hide();
  $("#partThree").hide();
  $("#partFive").hide();
  $("#partSix").hide();

  $("#part1").click(function() {
    $("#partOne").show();
    $("#partTwo").hide();
    $("#partThree").hide();
    $("#partFive").hide();
    $("#partSix").hide();
  });

  $("#part2").click(function() {
    $("#partTwo").show();
    $("#partOne").hide();
    $("#partThree").hide();
    $("#partFive").hide();
    $("#partSix").hide();
  });

  $("#part3_4").click(function() {
    $("#partThree").show();
    $("#partOne").hide();
    $("#partTwo").hide();
    $("#partFive").hide();
    $("#partSix").hide();
  });

  $("#part5").click(function() {
    $("#partFive").show();
    $("#partOne").hide();
    $("#partTwo").hide();
		$("#partThree").hide();
    $("#partSix").hide();
  });

  $("#part6").click(function() {
    $("#partSix").show();
    $("#partOne").hide();
    $("#partTwo").hide();
    $("#partThree").hide();
    $("#partFive").hide();
  });

  function setMajor() {
      var img = document.getElementById("image");
      img.src = this.value;
      return false;
  }
  document.getElementById("select_major").onchange = setMajor;
});

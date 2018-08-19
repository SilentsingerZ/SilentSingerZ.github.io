$(document).ready(function() {

    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.all();


    function setCountry() {
        var img = document.getElementById("image");
        img.src = this.value;
        return false;
    }
    document.getElementById("select_Country").onchange = setCountry;

    function setCategory() {
        var img = document.getElementById("image2");
        img.src = this.value;
        return false;
    }
    document.getElementById("select_Category").onchange = setCategory;

    function setJJ() {
        var img = document.getElementById("image3");
        img.src = this.value;
        return false;
    }
    document.getElementById("select_JJ").onchange = setJJ;

    function setJJ2() {
        var img = document.getElementById("image4");
        img.src = this.value;
        return false;
    }
    document.getElementById("select_JJ2").onchange = setJJ2;

});

function showDiv(value) {
    for(var i=0; i < divsO.length; i++) {
        divsO[i].style.display = 'none';
    }
    //unhide the selected div
    document.getElementById('hidden_div'+value).style.display = 'block';
}
 
window.onload=function() {
    //get the divs to show/hide
    divsO = document.getElementById("form-criterii").getElementsByTagName('div');
    this.showDiv(3);
}
function gridColour(i) {
  var k,result;
  var p=document.getElementById(i);
  var q= document.getElementsByClassName(
    "colour");
  for(k=0;k<q.length;k++) {
      if(q[k].checked) {
       result=q[k].value;
        break;
       }
  }
p.style.backgroundColor=result;
}
function reset() {
  var i;
  var a = document.getElementsByClassName(
    "aa");
  var b = document.getElementsByClassName(
    "bb");
  var c = document.getElementsByClassName(
    "cc");
  for(i=0;i<3;i++) {
      a[i].style.backgroundColor="#aaa";  b[i].style.backgroundColor="#aaa";c[i].style.backgroundColor="#aaa";
  }   
}
 
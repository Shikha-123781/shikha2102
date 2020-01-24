function gridColour(i) {
  var k,result;
  var p=document.getElementById(i);
  var q= document.getElementsByClassName("colour");
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
  var arr =['a','b','c','d','e','f','g','h','i'];
  var a = document.getElementsByClassName("aa");
  var b = document.getElementsByClassName("bb");
  var c=  document.getElementsByClassName("cc");
  for(i=0;i<3;i++) {
    a[i].style.backgroundColor="#aaa";  b[i].style.backgroundColor="#aaa";c[i].style.backgroundColor="#aaa";
  } 
  for(i=0;i<9;i++) {
    var x = document.getElementById(arr[i]);
    x.innerHTML=i+1;
  }
}
function suffle() {
  var i;
  var arr=[1,2,3,4,5,6,7,8,9];
  var a=["a",'b','c','d','e','f','g','h','i'];
  var l=[];
  for(i=0;i<9;i++) {
    do{
    l[i]=arr[Math.floor(Math.random()*9)];
    } while(check(l[i],l,i)==1); 
  var x = document.getElementById(a[i]);
  x.innerHTML=l[i];
  }
}
function check(value,l,i) {
  var j;
  flag=0;
  for(j=i-1;j>=0;j--) {
    if(l[i]==l[j]) {
      flag=1;
      break;
     }
  }
  return flag;
}



 
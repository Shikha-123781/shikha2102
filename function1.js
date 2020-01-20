secondLargest = (array) => {
  var i;
  var s_m;
  var length=array.length;
  var max=array[0];
  for(i=0;i<length;i++) {
    if(array[i]>max)
      max=array[i];
  }
  if(max==array[0])
    s_m= array[1];
  else
    s_m=array[0];
  for(i=0;i<length;i++) { 
  if(s_m<array[i]&&array[i]!=max)
        s_m=array[i];
  }
  return s_m;
}

calculateFrequency = (string) => {
  string="u@#d$fkj$#!kds";
  var k;
  var arr=[];
  var x=string.split("");
  var ans={ };
  for(let i=0;i<x.length;i++)
{  
  if(x[i]!=" "&&x[i]>="a"&&
     x[i]<="z"){
     if(ans[x[i]]===undefined)
      ans[x[i]]=0;
    ans[x[i]]+=1;
  }
} var flag=0;
  k=0;
  arr[0]="{";
for(var i in ans)
  {
   if(flag!=0)
     arr[++k]=",";
    else
      flag=1;
    arr[++k]=" ";
    arr[++k]=i;
    arr[++k]=":";
    arr[++k]=" ";
    arr[++k]=ans[i];
  }
  arr[++k]=" }";
  for(var i in arr)
     {
       document.write(arr[i]);
      
     }
// return arr;
}
var exec = require('child_process').exec;
var order =[null,"0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
"u","v","w","x","y","z"]

for(var i=1;i<order.length;i+=2){
  exec(`start cmd /k "node power.ts ${order[i]} ${order[i+1]} "` , function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }

    console.log('stdout: ' + stdout);
    console.log('stderr: ' +  stderr);

  });
}
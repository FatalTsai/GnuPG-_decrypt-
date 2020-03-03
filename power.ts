
var fs = require('fs')
var exec = require('child_process').exec;
var spawn = require("child_process").spawn,child;
var orderstring ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
//var order =[null,"0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
//"u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",]
var order =[null,"0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l",
"m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var found = false

var init =[]
var fullfill =[]

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });
  
var prefix1 = process.argv[2]  
var prefix2 =process.argv[3]

for(var i=0;i<5;i++)
{
    init.push(0)
    fullfill.push(order.length)   
}
// init =[0,0,13,21]
//init[3]=21
//init[2]=13
init[4]=0
console.log('init = '+init)

var carry = function(output)
{
    output[0]+=1
    var next_carry = 0
    for(var i=0;i<output.length;i++)
    {
        output[i]+=next_carry
        next_carry = Math.floor(output[i]/order.length )
        output[i]%=order.length
    }
    return output
}
var tostring =function(input)
{
    var result=''
    input.forEach(element => {
        if(element != 0)
            result+=order[element]

    });
    return result
}

var shelltry =function(input){ //abandon run in cannot promise

    var gpgc = `echo|set /p="${input}"| gpg --batch --passphrase-fd 0 --armor --decrypt ./testdecrypt/en.txt`
    //ref https://ss64.com/nt/syntax-redirection.html command pipe
    console.log(gpgc)

        exec(gpgc, function(error, stdout, stderr){
        if(error) {
            console.error('error: ' + error,'cp950');
            console.error('error: '+error)
            return;
        }
       if(stdout){
            console.log('success :'+gpgc)
            found = true
            fs.writeFileSync('thepwd',gpgc)
       }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' +  stderr);

     });

 
/* abandon run command in powershell
    child = spawn("powershell.exe",[gpgc]);
    child.stdout.on("data",function(data){
        console.log("Powershell Data: " + data);
        console.log(input)
    });
    child.stderr.on("data",function(data){
        console.log("Powershell Errors: " + data);
    });
    child.on("exit",function(){
        console.log("Powershell Script finished");
    });
    child.stdin.end(); //end input
    */
}


var isrepeat = function(input ){
    var havenotnull = false
    var result  = false
    for(var i =0;i < input.length-1;i++){
      if(input[i] == 0 && input[i+1] !=0)
      {
        result = true
      }
  
    }
    return result
  }
  

//ref :https://medium.com/@ali.dev/how-to-use-promise-with-exec-in-node-js-a39c4d7bbf77
function execShellCommand(input,prefix) {
    input = prefix+input
    var cmd =  `echo|set /p="${input}"| gpg --batch --passphrase-fd 0 --armor --decrypt ./testdecrypt/en.txt`
   const exec = require('child_process').exec;
   return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
     if (error) {
      //console.warn(error);
     }
     if(stdout)
     {             
        var time2 = new Date()
        time2.setTime(Date.now())
        fs.appendFileSync('thepwd',`${input} is the pwd ---${time2}\n`);
        found = true
        console.log(stdout)
     }
     //resolve(stdout? stdout : stderr);
     resolve(stdout? input +': pwd found!!!' :input+': not this one')
    });
   });
  }


(async function () {  
    var k= 0
    while(init != fullfill && !found){
    //while(k-- && !found){
        //console.log(init)
        //console.log(tostring(init))`
        init = carry(init)
        if(isrepeat(init))
        {
            continue
        }
        //sleep(1000)
        //shelltry(tostring(init))
        var out = await execShellCommand(tostring(init),prefix1)
        console.log(out)
        out = await execShellCommand(tostring(init),prefix2)
        console.log(out)
        k = (k+1)%1000
        if(k == 0)
        {
            console.log(`prefix : ${prefix1} ${prefix2} test to ${init} ${tostring(init)}\n`)
            fs.appendFileSync('record',`prefix : ${prefix1} ${prefix2} test to ${init} ${tostring(init)}\n`)
        }
    }


})();

    //console.log(tostring(init) )
    //shelltry(tostring(init) )
    function sleep(milliseconds) 
    { 
    var start = new Date().getTime(); 
    while(1)
        if ((new Date().getTime() - start) > milliseconds)
            break;
    }
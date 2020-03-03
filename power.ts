
var fs = require('fs')
var exec = require('child_process').exec;
var spawn = require("child_process").spawn,child;
var orderstring ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
var order =[null,"0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
"u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",]

var found = false

var init =[10,31,13,21]
var fullfill = [order.length,order.length,order.length,order.length]
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

var shelltry =function(input){

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

/*
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


fs.writeFileSync('order_log','')
var k= 100
//while(init != fullfill){
while(k--){
    //console.log(init)
    //console.log(tostring(init))`
    //fs.appendFileSync('order_log','\n'+tostring(init));
    init = carry(init)
    //sleep(1000)
    shelltry(tostring(init))

}
//console.log(tostring(init) )
//shelltry(tostring(init) )
    function sleep(milliseconds) 
    { 
    var start = new Date().getTime(); 
    while(1)
        if ((new Date().getTime() - start) > milliseconds)
            break;
    }


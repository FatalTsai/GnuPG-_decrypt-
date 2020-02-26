  
var process = require('child_process');
var exec = require('child_process').exec;
var iconv = require('iconv-lite');
var  readline = require('readline');
var gpg = require('gpg')
var fileDecrypted ='./testdecrypt/de.txt'
var fileEncrypted = './testdecrypt/en.txt'
/*
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});*/
exec(` gpg --batch --passphrase-fd 0 --armor --decrypt ./testdecrypt/en.txt < pwd.txt`, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }
   
    console.log('stdout: ' + stdout);
    console.log('stderr: ' +  stderr);
});
/*
exec(`gpg --output ./testdecrypt/de.txt  --decrypt ./testdecrypt/en.txt`,{encoding:'binaryEncoding'}, function(error, stdout, stderr){
    if(error) {
        //console.error('error: ' + iconv.decode(error,'cp950'));
        //console.error('error: '+error)
        return;
    }
   
    console.log('stdout: ' + iconv.decode(stdout,'cp950'));
    console.log('stderr: ' +  stderr);
});*/

/*
gpg.callStreaming(fileEncrypted, fileDecrypted, 'fuck', (err, success) => {
    // success/err
    if(err)
        console.log(err)
    else if(success)
        console.log(success)

  });*/
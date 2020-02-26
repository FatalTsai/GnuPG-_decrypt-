  
var process = require('child_process');
var exec = require('child_process').exec;
var iconv = require('iconv-lite');
var  readline = require('readline');
var gpg = require('gpg')
var fileDecrypted ='./testdecrypt/de.txt'
var fileEncrypted = './testdecrypt/en.txt'




exec(` gpg --batch --passphrase-fd 0 --armor --decrypt ./testdecrypt/en.txt `, function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error,'cp950');
        console.error('error: '+error)
        return;
    }
   
    console.log('stdout: ' + stdout);
    console.log('stderr: ' +  stderr);
});


const Shell = require('node-powershell');
 
const ps = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true
});
 
ps.addCommand(`echo "ff" | gpg --batch --passphrase-fd 0 --armor --decrypt ./testdecrypt/en.txt`);
ps.invoke()
.then(output => {
  console.log('output = '+output);
})
.catch(err => {
  console.log('err = '+err);
})
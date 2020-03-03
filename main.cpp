#include <stdio.h>
#include <string.h>
#include <stdlib.h>


int main () {
   char command[1386];

   strcpy( command, "gpg --batch --passphrase-fd 0 --armor --decrypt ./testdecrypt/en.txt <pwd.txt" );
   system(command);

} 
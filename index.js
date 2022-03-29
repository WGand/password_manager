const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcryptjs");
//const { pool } = require("./config");
const app = express();
const port = 3000;
app.use(bodyParser.json())

const password = 'pass123';
var hashedPassword;
  
// Encryption of the string password
bcrypt.genSalt(10, function (err, Salt) {
  
    // The bcrypt is used for encrypting password.
    bcrypt.hash(password, Salt, function (err, hash) {
  
        if (err) {
            return console.log('Cannot encrypt');
        }
  
        hashedPassword = hash;
        console.log(hash);
  
        bcrypt.compare(password, hashedPassword, 
            async function (err, isMatch) {
  
            // Comparing the original password to
            // encrypted password   
            if (isMatch) {
                console.log('Encrypted password is: ', password);
                console.log('Decrypted password is: ', hashedPassword);
            }
  
            if (!isMatch) {
              
                // If password doesn't match the following
                // message will be sent
                console.log(hashedPassword + ' is not encryption of ' 
                + password);
            }
        })
    })
})



app.listen(port, () =>{
    console.log('Now listening on port ${port}');
});
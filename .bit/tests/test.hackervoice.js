let uri = undefined
const fetch = require('node-fetch');

const fs = require('fs') //get the methods in the fs package

//if you wanna add more files, just put a comma after the filename (array)
const commit_file = ['letMeIn.js']

for(var i = 0; i < commit_file.length; i++) {
    var a = commit_file[i];
    fs.access(commit_file[i], err => {
        if (err) {
            throw new Error("You did not commit '" + a + "'")
        }
    })
}

uri = process.env.HACKERVOICE_ENDPOINT

if (uri[0] != "h") {
   throw new Error("You have not added your function url as a secret!");
}

try {
    (async () => {
        const resp = await fetch(uri + "&password=letmein", {
            method: 'GET'
        });
        var correct = await resp.text()

        const response = await fetch(uri + "&password=incorrect", {
            method: 'GET'
        });
        var incorrect = await response.text()

        try {
            if (correct == "Access granted." && incorrect == "Access denied.") {
                console.log("Yay! 🎉 You didn't let the bad guys in.")
            } else {
                console.log("Try again!")
                console.log(`We go ${correct} and ${incorrect}, but it should be "Access granted." and "Access denied."`)
                process.exit(1)
            }
        } catch (e) {
            console.log("Are you sure you returned something to us? We didn't get anything. Try again!")
            process.exit(1)
        }

    })();
} catch (e) {
    throw new Error("You have not added your function url as a secret!");
}

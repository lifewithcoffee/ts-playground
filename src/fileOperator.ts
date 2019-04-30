import fs = require('fs');

export default {
    listFiles(args) {
        var dirPath = args[0];

        fs.readdir(dirPath, (err, files) => {
            files.forEach(file => {
                console.log(file);
            })
        })
    },
    testFoo(){
        console.log("testFoo() called");
    }
}
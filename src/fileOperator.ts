import fs = require('fs');

export default {

    // execute: node main operateFiles listFiles
    listFiles(args) {
        console.log(`args = ${args}`);
        var folder = args[0];
        //var folder = argc[2];
        // var folder = this.args[2];

        fs.readdir(folder, (err, files) => {
            files.forEach(file => {
                console.log(file);
            })
        })
    },

    // execute: node main operateFiles testFoo
    testFoo(){
        console.log("testFoo() called");
    }
}
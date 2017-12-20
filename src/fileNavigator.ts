import fs = require('fs');

export class FileNavigator {
    listFiles(folder:string) {
        fs.readdir(folder, (err, files) => {
            files.forEach(file => {
                console.log(file);
            })
        })
    }
}
import {Factorial} from './factorial';
// import {FileOperator} from './fileOperator';


function getCommands(instance) {
    var list_without_constructor = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).splice(1); // the first one is 'constructor()' if instance is an instance of a class
    return list_without_constructor;
}


class Cmds {
    help() {
        console.log("Listing command methods:");

        var list_without_constructor = getCommands(this);
        console.log(list_without_constructor);
    }
    
    factorial(argSubCmd) {
        console.log(`Input number is ${argSubCmd}`);

        if(! /^\d+$/.test(argSubCmd)) {
            console.error(`Invalid input ${argSubCmd}`);
            process.exit(1);
        }

        const fact = new Factorial(+argSubCmd);
        console.log(`Factorial of ${argSubCmd} is ${fact.getFactorial()}`);

    }

    // operateFile(argSubCmd){
    //     console.log("operateFile() called");
    //     import('./fileOperator').then((m) => {
    //         var file_operator = new m.FileOperator();

    //         if(file_operator[argSubCmd] == null) {
    //             console.log(`There is no such command: ${argSubCmd};`);
    //         }else{
    //             console.log(`Executing command: ${file_operator.constructor.name}.${argSubCmd}`);
    //             console.log("-----------------------------");
    //             file_operator[argSubCmd]();
    //         }
    //     });
    // }
    
    startExpress() {
        import('./index');
    }
}

class Main{
    static main(argc:string[]) {
        if(argc.length < 1){
            console.error(`Invalid number of arguments ${argc}`);
            process.exit(1);
        } 
        
        var argCmd = argc[0];
        var argSubCmd = argc[1];

        var cmd = new Cmds();

        var cmdList = getCommands(cmd);
        console.log(`argCmd is ${argCmd}`);
        if (cmdList.indexOf(argCmd) >= 0) {
            console.log("Command found, index = " + cmdList.indexOf(argCmd));
        } else {
            console.log("Command not found, try to load from external files ...");
            import(`./${argCmd}`).then((m) => {
                console.log("module loaded");
                m.default[argSubCmd](argc.splice(2));
            }).catch((err) => {
                console.error(err);
            });
        }

        if(cmd[argCmd] == null) {
            console.log(`There in no such command: ${argCmd}; Try command 'help' for more info.`);
        }else{
            console.log(`Executing command: ${cmd.constructor.name}.${argCmd}`);
            console.log("-----------------------------");
            cmd[argCmd](argSubCmd);
        }
    }
}

export const argc = process.argv.splice(2);
Main.main(argc);
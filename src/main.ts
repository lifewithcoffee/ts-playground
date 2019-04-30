import {Factorial} from './factorial';
// import {FileOperator} from './fileOperator';

class Cmds {
    help() {
        console.log("Listing command methods:");

        var list_without_constructor = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).splice(1);
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

    operateFile(argSubCmd){
        console.log("operateFile() called");
        import('./fileOperator').then((m) => {
            var file_operator = new m.FileOperator();

            if(file_operator[argSubCmd] == null) {
                console.log(`There is no such command: ${argSubCmd};`);
            }else{
                console.log(`Executing command: ${file_operator.constructor.name}.${argSubCmd}`);
                console.log("-----------------------------");
                file_operator[argSubCmd]();
            }
        });
    }
    
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
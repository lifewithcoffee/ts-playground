import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";

// const PROTO_PATH = __dirname + 'Protos/helloworld.proto';
const PROTO_PATH = [
  `${__dirname}/../../DotnetSolution/GrpcService1/Protos/greet.proto`,
];

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

// the ending 'helloworld' here might be the package defined in the .proto file
const hello_proto: any =
  grpc.loadPackageDefinition(packageDefinition).greet;

function GreeterService() {
  return new hello_proto.Greeter(
    "localhost:5000",
    grpc.credentials.createInsecure(),
  );
}

function RltestService() {
  return new hello_proto.Rltest(
    "localhost:5000",
    grpc.credentials.createInsecure(),
    //grpc.credentials.createSsl(),
  );
}

function sayHello() {
  console.log("calling sayHello() ...");
  GreeterService().sayHello(
    { name: "from sayHello" },
    (err, response) => {
      console.log('Error:', err);
      console.log("Response:", response.message);
    },
  );
}

function howdy() {
  console.log("calling howdy() ...");
  RltestService().howdy(
    { name: "from howdy" },
    (err, response) => {
      console.log('Error:' + err);
      console.log("Response:", response.message);
    }
  );
}

export const greeting = {
  sayHello,
  howdy,
};

import * as protoLoader from '@grpc/proto-loader';
import * as grpc from 'grpc';

// const PROTO_PATH = __dirname + 'Protos/helloworld.proto';
const PROTO_PATH = [
  'E:\\rp\\outdoor-asset-tracking\\app-front-end\\dotnet-worker\\GeoSensePlus.Server\\Protos\\helloworld.proto',
  'E:\\rp\\outdoor-asset-tracking\\app-front-end\\dotnet-worker\\GeoSensePlus.Server\\Protos\\rltest.proto',
];

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });

// the ending 'helloworld' here might be the package defined in the .proto file
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function GreeterService() {
  return new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());
}

function RltestService() {
  return new hello_proto.Rltest('localhost:50051', grpc.credentials.createInsecure());
}

function sayHello() {
  GreeterService().sayHello({name: 'from ts-node'}, (err, response) => {
    // console.log('Error:', err);
    console.log('Response:', response.message);
  });
}

function howdy() {
  RltestService().howdy({name: 'from ts-node!!!!'}, (err, response) => {
    // console.log('Error:' + err);
    console.log('Response:', response.message);
  });
}

export const greeting = {
  sayHello,
  howdy,
};
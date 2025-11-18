import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PROTO_PATH = "./src/protos/tenant.proto";

//load proto
const packageDef = protoLoader.loadSync(PROTO_PATH)
const tenantProto = grpc.loadPackageDefinition(packageDef).tenant

const server = new grpc.Server()

// Implement RPC handlers
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PROTO_PATH = __dirname + "/protos/tenant.proto";

// FIX: add loader options
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Now your service loads correctly
const tenantProto: any = grpc.loadPackageDefinition(packageDef).tenant;

const server = new grpc.Server();

server.addService(tenantProto.TenantService.service, {
  getTenantDivionIds: async (call: any, callback: any) => {
    try {
      const { id } = call.request;

      const record = await prisma.tenantDivision.findUnique({
        where: { id } // <-- you decide logic
      });

      if (!record) {
        return callback(null, {
          id,
          tenantId: 0,
          divisionId: 0
        });
      }

      callback(null, {
        id,
        tenantId: record.tenantId,
        divisionId: record.divisionId
      });

    } catch (err) {
      console.error("Error in getTenantDivionIds:", err);
      callback(err);
    }
  }
});

server.bindAsync(
  "0.0.0.0:50052",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Tenant gRPC service running on 0.0.0.0:50052");
    server.start();
  }
);

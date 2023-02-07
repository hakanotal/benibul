import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { env } from "../../env/client.mjs";
import { type RecordType } from "../schema/Record.js";

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: env.NEXT_PUBLIC_DB_ACCESS_KEY,
    secretAccessKey: env.NEXT_PUBLIC_DB_SECRET_KEY,
  },
  region: env.NEXT_PUBLIC_DB_REGION,
});

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: false,
  convertClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};
const translateConfig = { marshallOptions, unmarshallOptions };
const ddbDocClient = DynamoDBDocumentClient.from(client, translateConfig);


export const saveRecord = async (record: RecordType) => {
  const params = {
    TableName: env.NEXT_PUBLIC_DB_TABLE,
    Item: record,
  };

  return await ddbDocClient.send(new PutCommand(params));
};

export const getAllRecords = async () => {
  const params = {
    TableName: env.NEXT_PUBLIC_DB_TABLE,
    Select: "ALL_ATTRIBUTES",
  };

  const resp = await ddbDocClient.send(new ScanCommand(params));
  return resp.Items;
};

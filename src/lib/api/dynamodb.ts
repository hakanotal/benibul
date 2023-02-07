/* 
import * as uuid from "uuid";
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { env } from "../../env/server.mjs";

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: env.NEXT_PUBLIC_DB_ACCESS_KEY,
    secretAccessKey: env.NEXT_PUBLIC_DB_SECRET_KEY,
  },
  region: env.NEXT_PUBLIC_DB_REGION,
});

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { Item } = await client.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          id: { S: uuid.v4() },
          content: { S: req.body.content },
        },
      })
    );

    return res.status(201).json(Item);
  }

  if (req.method === "GET") {
    const { Item } = await client.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.query.id },
        },
      })
    );

    return res.status(200).json(Item);
  }

  if (req.method === "POST") {
    const { Attributes } = await client.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.body.id },
        },
        UpdateExpression: "set content = :c",
        ExpressionAttributeValues: {
          ":c": { S: req.body.content },
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return res.status(200).json(Attributes);
  }

  if (req.method === "DELETE") {
    await client.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: req.body.id },
        },
      })
    );

    return res.status(204).json({});
  }
}
 */

const db = async () => {
  console.log("db");
};
export default db;
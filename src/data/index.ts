import AWS from "aws-sdk";

import { Album } from "../utils/typings";

const TableName = "AlbumShuffleUsers";

const getDynamoDBClient = () => {
  const options = {
    convertEmptyValues: true,
    region: "us-east-1",
  };

  const client = process.env.LOCAL_DYNAMO_DB_ENDPOINT
    ? new AWS.DynamoDB.DocumentClient({
        ...options,
        endpoint: process.env.LOCAL_DYNAMO_DB_ENDPOINT,
      })
    : new AWS.DynamoDB.DocumentClient(options);

  return client;
};

export type Token = {
  token: string;
  timestamp: number;
};

export const getLoginTokens = async (email: string): Promise<Token[]> => {
  const { Item } = await getDynamoDBClient()
    .get({
      TableName,
      Key: { email: email },
      ProjectionExpression: "loginTokens",
    })
    .promise();
  return JSON.parse(Item?.loginTokens ?? "[]");
};

export const putLoginTokens = async (email: string, tokens: Token[]) => {
  await getDynamoDBClient()
    .update({
      TableName,
      Key: { email: email },
      UpdateExpression: "set loginTokens = :t",
      ExpressionAttributeValues: {
        ":t": JSON.stringify(tokens),
      },
    })
    .promise();
};

export const getAuthTokens = async (email: string): Promise<Token[]> => {
  const { Item } = await getDynamoDBClient()
    .get({
      TableName,
      Key: { email: email },
      ProjectionExpression: "authTokens",
    })
    .promise();
  return JSON.parse(Item?.authTokens ?? "[]");
};

export const putAuthTokens = async (email: string, tokens: Token[]) => {
  await getDynamoDBClient()
    .update({
      TableName,
      Key: { email: email },
      UpdateExpression: "set authTokens = :t",
      ExpressionAttributeValues: {
        ":t": JSON.stringify(tokens),
      },
    })
    .promise();
};

export const getAlbums = async (email: string) => {
  const { Item } = await getDynamoDBClient()
    .get({
      TableName,
      Key: { email: email },
      ProjectionExpression: "albums",
    })
    .promise();
  return JSON.parse(Item?.albums ?? "[]");
};

export const putAlbums = async (email: string, albums: Album[]) => {
  await getDynamoDBClient()
    .update({
      TableName,
      Key: { email: email },
      UpdateExpression: "set albums = :t",
      ExpressionAttributeValues: {
        ":t": JSON.stringify(albums),
      },
    })
    .promise();
};

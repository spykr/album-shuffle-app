const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: process.env.LOCAL_DYNAMO_DB_ENDPOINT,
});

let dynamodb = new AWS.DynamoDB();

let params = {
  TableName: "AlbumShuffleUsers",
  KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
  BillingMode: "PAY_PER_REQUEST",
};

(async function() {
  try {
    await dynamodb.createTable(params).promise();
  } catch (e) {
    console.error(e);
  }
})();

import * as cdk from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";
import { WatKostMijnInterieurCdkStack } from "./WatKostMijnInterieurCdkStack";

describe("WatKostMijnInterieurCdkStack", () => {
  let stack: cdk.Stack;
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    stack = new WatKostMijnInterieurCdkStack(app, "TestStack");
    template = Template.fromStack(stack);
  });

  test("Creates an AWS Lambda Function", () => {
    template.hasResourceProperties("AWS::Lambda::Function", {
      Runtime: "nodejs20.x",
      Handler: "lambdaHandler.handler",
    });
  });

  test("Creates an API Gateway with a POST method", () => {
    template.hasResource("AWS::ApiGateway::Method", {
      Properties: {
        HttpMethod: "POST",
      },
    });
  });

  test("API Gateway CORS is configured", () => {
    template.hasResourceProperties("AWS::ApiGateway::RestApi", {
      Name: "Price Estimation Service",
    });

    template.hasResourceProperties("AWS::ApiGateway::Method", {
      HttpMethod: "OPTIONS",
      Integration: {
        IntegrationResponses: [
          {
            ResponseParameters: {
              "method.response.header.Access-Control-Allow-Headers": "'Content-Type'",
              "method.response.header.Access-Control-Allow-Methods": "'POST'",
              "method.response.header.Access-Control-Allow-Origin": "'http://localhost:3000'",
            },
          },
        ],
        Type: "MOCK",
      },
      MethodResponses: [
        {
          ResponseParameters: {
            "method.response.header.Access-Control-Allow-Headers": true,
            "method.response.header.Access-Control-Allow-Methods": true,
            "method.response.header.Access-Control-Allow-Origin": true,
          },
        },
      ],
    });
  });

  test("CloudFormation output contains API URL", () => {
    template.hasOutput("apiUrl", Match.objectLike({}));
  });
});

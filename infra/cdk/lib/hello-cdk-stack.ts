import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function resource
    const myFunction = new lambda.Function(this, "HelloWorldFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "handlers/lambdaHandler.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../../../apps/backend/dist")),
    });

    // Create the API Gateway
    const api = new apigateway.RestApi(this, "GreetingApi", {
      restApiName: "Greeting Service",
    });

    // Create the /greeting endpoint
    const greetingResource = api.root.addResource("hello");
    greetingResource.addMethod("GET", new apigateway.LambdaIntegration(myFunction));

    // Create the /greeting/{name} endpoint
    const nameResource = greetingResource.addResource("{name}");
    nameResource.addMethod("GET", new apigateway.LambdaIntegration(myFunction));

    // Output the API URL
    new cdk.CfnOutput(this, "apiUrl", {
      value: api.url,
    });
  }
}

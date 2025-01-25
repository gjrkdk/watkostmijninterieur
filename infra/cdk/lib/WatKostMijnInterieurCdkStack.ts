import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";

export class WatKostMijnInterieurCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function resource
    const myFunction = new lambda.Function(this, "PriceCalculatorFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "lambdaHandler.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../../../apps/backend/dist")),
    });

    // Create the API Gateway
    const api = new apigateway.RestApi(this, "PriceEstimationApi", {
      restApiName: "Price Estimation Service",
      defaultCorsPreflightOptions: {
        allowOrigins: ["http://localhost:3000"],
        allowMethods: ["POST"],
        allowHeaders: ["Content-Type"],
      },
    });

    const priceEstimationResource = api.root.addResource("price-estimation");
    priceEstimationResource.addMethod("POST", new apigateway.LambdaIntegration(myFunction));

    new cdk.CfnOutput(this, "apiUrl", {
      value: api.url,
    });
  }
}

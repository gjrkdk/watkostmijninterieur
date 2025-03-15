import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { CfnOutput } from "aws-cdk-lib";

export class WatKostMijnInterieurProd extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloLambdaFn = new lambda.Function(this, "StageEnvironmentFunction", {
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: "lambdaHandler.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../../../../apps/backend/dist")),
      environment: {
        ENV: "prod",
      },
    });

    const httpApi = new apigatewayv2.HttpApi(this, "HttpApi", {
      apiName: "Hello API",
      corsPreflight: {
        allowOrigins: ["*"],
        allowMethods: [apigatewayv2.CorsHttpMethod.GET, apigatewayv2.CorsHttpMethod.POST],
        allowHeaders: ["Content-Type", "Authorization"],
      },
    });

    httpApi.addRoutes({
      path: "/hello",
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration("LambdaIntegration", helloLambdaFn),
    });

    new CfnOutput(this, "ApiEndpoint", {
      value: httpApi.apiEndpoint,
    });
  }
}

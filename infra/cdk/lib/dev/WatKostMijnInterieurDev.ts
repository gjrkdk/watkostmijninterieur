import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Table, AttributeType, BillingMode } from "aws-cdk-lib/aws-dynamodb";
import * as path from "path";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { CfnOutput } from "aws-cdk-lib";

export class WatKostMijnInterieurDev extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const tableName = process.env.TABLE_NAME_DEV || "Default";

    const contactsTable = new Table(this, "contactsTable", {
      tableName: tableName,
      partitionKey: { name: "id", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const priceCalculation = new lambda.Function(this, "StageEnvironmentFunction", {
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: "lambdaHandler.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../../../../apps/backend/dist")),
      environment: {
        ENV: "dev",
        TABLE_NAME_DEV: contactsTable.tableName,
      },
    });

    contactsTable.grantWriteData(priceCalculation);

    const httpApi = new apigatewayv2.HttpApi(this, "HttpApi", {
      apiName: "PriceCalculationService",
      corsPreflight: {
        allowOrigins: ["*"],
        allowMethods: [apigatewayv2.CorsHttpMethod.GET, apigatewayv2.CorsHttpMethod.POST],
        allowHeaders: ["Content-Type", "Authorization"],
      },
    });

    httpApi.addRoutes({
      path: "/price-calculation",
      methods: [apigatewayv2.HttpMethod.GET, apigatewayv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration("LambdaIntegration", priceCalculation),
    });

    new CfnOutput(this, "ApiEndpoint", {
      value: httpApi.apiEndpoint,
    });
  }
}

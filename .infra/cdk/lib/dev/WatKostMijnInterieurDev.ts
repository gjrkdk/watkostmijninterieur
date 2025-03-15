import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Table, AttributeType, BillingMode } from "aws-cdk-lib/aws-dynamodb";
import * as path from "path";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";

export class WatKostMijnInterieurDev extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stageName = "dev";
    const sendgridApiKey = process.env.SENDGRID_API_KEY || "";
    const senderEmail = process.env.SENDER_EMAIL || "";

    const contactsTable = new Table(this, "contactsTable", {
      tableName: "Contacts",
      partitionKey: { name: "id", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const priceCalculation = new lambda.Function(this, "PriceCalculationFunction", {
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: "lambdaHandler.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../../../../apps/backend/dist")),
      environment: {
        ENV: "dev",
        SENDGRID_API_KEY: sendgridApiKey,
        SENDER_EMAIL: senderEmail,
      },
    });

    contactsTable.grantReadWriteData(priceCalculation);

    const httpApi = new apigatewayv2.HttpApi(this, "HttpApi", {
      apiName: "PriceCalculationService",
      corsPreflight: {
        allowOrigins: ["*"],
        allowMethods: [
          apigatewayv2.CorsHttpMethod.GET,
          apigatewayv2.CorsHttpMethod.POST,
          apigatewayv2.CorsHttpMethod.OPTIONS,
        ],
        allowHeaders: ["Content-Type", "Authorization"],
      },
    });

    httpApi.addRoutes({
      path: "/price-calculation",
      methods: [apigatewayv2.HttpMethod.GET, apigatewayv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration("LambdaIntegration", priceCalculation),
    });

    const apiStage = new apigatewayv2.CfnStage(this, "ApiStage", {
      apiId: httpApi.httpApiId,
      stageName: stageName,
      autoDeploy: true,
    });
    apiStage.node.addDependency(httpApi);
  }
}

#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { HelloCdkStack } from "../lib/hello-cdk-stack";

const app = new cdk.App();
new HelloCdkStack(app, "HelloCdkStack", {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION || "eu-west-1",
  },
});

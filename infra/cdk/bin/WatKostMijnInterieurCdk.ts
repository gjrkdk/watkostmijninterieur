#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { WatKostMijnInterieurCdkStack } from "../lib/WatKostMijnInterieurCdkStack";

const app = new cdk.App();
new WatKostMijnInterieurCdkStack(app, "WatKostMijnInterieurCdkStack", {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION || "eu-west-1",
  },
});

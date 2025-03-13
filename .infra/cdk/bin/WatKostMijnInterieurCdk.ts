#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { WatKostMijnInterieurDev } from "../lib/dev/WatKostMijnInterieurDev";
import { WatKostMijnInterieurProd } from "../lib/prod/WatKostMijnInterieurProd";

const app = new cdk.App();

new WatKostMijnInterieurDev(app, "WatKostMijnInterieurDev", {
  env: {
    account: process.env.AWS_ACCOUNT_DEV_ID,
    region: process.env.AWS_REGION || "eu-west-1",
  },
});

new WatKostMijnInterieurProd(app, "WatKostMijnInterieurProd", {
  env: {
    account: process.env.AWS_ACCOUNT_PROD_ID,
    region: process.env.AWS_REGION || "eu-west-1",
  },
});

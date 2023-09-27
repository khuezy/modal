import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

// import {
//   CacheCookieBehavior,
//   CacheHeaderBehavior,
//   CachePolicy,
//   CacheQueryStringBehavior,
// } from "aws-cdk-lib/aws-cloudfront";

// class NextjsSite extends SSTNext {
//   protected supportsStreaming(): boolean {
//     return false;
//   }
// }
export default {
  config() {
    return {
      name: "modal",
      region: "us-east-1",
    };
  },
  stacks(app) {


    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        path: ".",
        buildCommand: "npm run openbuild",
        cdk: {
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;

import { SSTConfig } from "sst";
import { Cron, Bucket, NextjsSite as SSTNext } from "sst/constructs";
import { Duration, Stack } from "aws-cdk-lib/core";

import {
  CacheCookieBehavior,
  CacheHeaderBehavior,
  CachePolicy,
  CacheQueryStringBehavior,
} from "aws-cdk-lib/aws-cloudfront";
function buildServerCachePolicy(stack: Stack) {
  return new CachePolicy(stack, "ServerCache", {
    queryStringBehavior: CacheQueryStringBehavior.all(),
    headerBehavior: CacheHeaderBehavior.allowList(
      ...[
        "accept",
        "rsc",
        "next-router-prefetch",
        "next-router-state-tree",
        "next-url",
        "x-invoke-output",
        "x-invoke-path",
        "x-invoke-query",
        "x-middleware-invoke",
      ]
    ),
    cookieBehavior: CacheCookieBehavior.none(),
    defaultTtl: Duration.days(0),
    maxTtl: Duration.days(365),
    minTtl: Duration.days(0),
    enableAcceptEncodingBrotli: true,
    enableAcceptEncodingGzip: true,
    comment: "Nextjs Server response cache policy",
  });
}
class NextjsSite extends SSTNext {
  protected supportsStreaming(): boolean {
    return true;
  }
}
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
          serverCachePolicy: buildServerCachePolicy(stack),
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;

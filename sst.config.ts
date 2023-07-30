import { SSTConfig } from "sst";
import { Cron, Bucket, NextjsSite } from "sst/constructs";

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
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;

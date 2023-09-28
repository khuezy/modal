/**
 * NOTE: This is not supported yet. 
 * Revalidation is done via /pages/api/revalidate/index.ts
 */
import { NextRequest, NextResponse } from 'next/server'
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
  const client = new CloudFrontClient({ region: 'us-east-1' })
  const path = decodeURIComponent(request.nextUrl.searchParams.get('url') ?? '/isr')
  revalidateTag('bacon')

  await client.send(new CreateInvalidationCommand({
    DistributionId: 'E1CBJ29XDXVXN6',
    InvalidationBatch: {
      CallerReference: '' + Date.now(),
      Paths: {
        Quantity: 1,
        Items: [path]
      }
    }
  }))

  return NextResponse.json({ revalidated: true, path })
}

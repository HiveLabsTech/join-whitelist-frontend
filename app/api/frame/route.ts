import { NextRequest, NextResponse } from 'next/server'
import { NEXT_PUBLIC_URL } from '../../config'
import { getFrameHtmlResponse } from '@coinbase/onchainkit';




export async function POST(req: NextRequest): Promise<Response> {
    let redirectUrl =""
    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Confirm to join',
                    action: 'post'
                }
            ],
            image: `${NEXT_PUBLIC_URL}/park-1.png`,
        })
    )

    const headers = new Headers()
    headers.set('Loaction', redirectUrl)
    const response = NextResponse.redirect(`${redirectUrl}`, {
        headers,
        status: 302
    })
    return response
   
}


export const dynamic = "force-dynamic"
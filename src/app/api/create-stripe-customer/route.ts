// サブスク決済のポストリクエストを送った時のストライプへの顧客データ保存API
// npm i stripe でストライプのモジュールをインストール

import { NextRequest } from "next/server";
import initstripe from "stripe"; 

export async function POST(req: NextRequest) {

    const date = req.json();
    const {email} = date;

    
    const stripe = new init.stripe(process.env.STRIPE_SECRET_KEY as string)
    const customer = await stripe.customers.create({
        email,
    })

    return NextRequest.json({
        message: `stripe customer created: ${customer.id}`,
    })
}



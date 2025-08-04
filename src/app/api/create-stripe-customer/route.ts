// サブスク決済のポストリクエストを送った時のストライプへの顧客データ保存API
// npm i stripe でストライプのモジュールをインストール

import { NextRequest, NextResponse } from "next/server";
import initiStripe  from "stripe"; 


export async function POST(req: NextRequest) {
    
    const date = await req.json();
    const {email} = date;
    
    const stripe = new initiStripe(process.env.STRIPE_SECRET_KEY!);
    
    const customer = await stripe.customers.create({
        email,
    })

    return NextResponse.json({
        message: `stripe customer created: ${customer.id}`,
    })
}





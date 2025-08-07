// サブスク決済のポストリクエストを送った時のストライプへの顧客データ保存API
// npm i stripe でストライプのモジュールをインストール

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import initiStripe  from "stripe"; 
import {cookies} from "next/headers";


export async function POST(req: NextRequest) {
    // ここで初期化
    const supabase = createRouteHandlerClient({cookies})

    
    const date = await req.json();
    const {id, email} = date;
    
    const stripe = new initiStripe(process.env.STRIPE_SECRET_KEY!);
    
    const customer = await stripe.customers.create({
        email,
    });

    const { error } =  await supabase
    .from("profile")
    .update({
        stripe_customer: customer.id,
    })
    .eq("id", id);

    console.log(error);


    return NextResponse.json({
        message: `stripe customer created: ${customer.id}`,
    })
}






// サブスク決済のポストリクエストを送った時のストライプへの顧客データ保存API
// npm i stripe でストライプのモジュールをインストール
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import initiStripe  from "stripe"; 
import {cookies} from "next/headers";
// import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    // ここで初期化
    // const supabase = await createRouteHandlerClient({cookies});

    // Next.jsの最新版に合わせる。

    // const cookieStore = cookies();
    // const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const supabase = createRouteHandlerClient({
          cookies: () => cookies(), // ← ここが肝
      });



    // 簡易的なアクセス制限
    // const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
    // if (query !== process.env.API_ROUTE_SECRET) { 
    //     return NextResponse.json({
    //         message: "APIを叩く権限がありません。"
    //     }); 
    // }
    
    // 更新対象のユーザーのid（UUID）とstripe顧客作成用のemailを受け取る。
    // const {id, email} = await req.json();


    const data = await req.json();
    const {id, email} = data;


    // Stripeの顧客を作成
    // 正常ならcustomer.idが帰ってくる。
    const stripe = new initiStripe(process.env.STRIPE_SECRET_KEY!);
    const customer = await stripe.customers.create({ email });

    // const admin = createClient(
    //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //     process.env.SUPABASE_SERVICE_ROLE_KEY!
    //   );

    // const {data, error, count} = await admin
    // .from("profile")
    // .update({ stripe_customer: customer.id })
    // .eq("id", id);
    await supabase
    .from("profile")
    .update({ stripe_customer: customer.id })
    .eq("id", id);

    // if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // if ((count ?? 0) === 0)
    //     return NextResponse.json({ error: "No rows updated (id mismatch?)" }, { status: 404 });

    // await supabase.from("profile").update({ stripe_customer: customer.id }).eq("id", id);

    return NextResponse.json({ message: `stripe customer created: ${customer.id}`});
}




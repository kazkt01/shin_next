import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react" 


const getDetailLessonLessons = async (id: number) => {
    // これは、SSRかSSGかでいうとSSGになるとのこと
    const supabase = createServerComponentClient({cookies});
    // ↓これは、supabase独自のSQL文？　eqとかsingleとか特に　
    const {data: lesson } = await supabase.from("lesson").select("*").eq("id", id).single();
    return lessons
  }



const LessonDetailPage = ({params}: {params: {id: number}}) =>  {
    console.log(params);
    const lesson = await getDetailLessonLessons(params.id);
    console.log(lesson);
    return <div>LessonDetailPage</div>
}
export default LessonDetailPage;
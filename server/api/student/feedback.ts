import { inspect } from "util";
import sql from "~/utils/postgresql";
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const data = {
        matricNo: body['matricNumber'],
        rating: parseInt(body['rating']),
        feedback: body['feedback'],
        time: new Date(),
        programID: parseInt(body['programID'])
    }
    
    console.log(data);
    

    const result = await sql`
    INSERT INTO public."StudentFeedback" ${sql(data, "matricNo", "rating", "feedback", "time", "programID")}
    `

    return {
        message: 'OK'
    }

})

// "feedbackID" integer NOT NULL DEFAULT nextval('"StudentFeedback_feedbackID_seq"'::regclass),
// "matricNo" text COLLATE pg_catalog."default",
// rating smallint,
// feedback text COLLATE pg_catalog."default",
// "time" date,
// CONSTRAINT "StudentFeedback_pkey" PRIMARY KEY ("feedbackID")
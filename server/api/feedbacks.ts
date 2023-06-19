import postgres from "postgres";
import sql from "~/utils/postgresql";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const result1 = await sql`
        select * from public."Program_Registration"
        where "programID" = ${body['programID']}
    `

    const result = await sql`
        select f."feedbackID", f."matricNo", f."rating", f."feedback", f."time", r."programName", r."programDuration", r."programDate", s."studentName", s."emailAddress", k."kuliyyah_name"
        from public."StudentFeedback" f
        INNER JOIN public."StudentRegistration" s
        ON s."matricNo" = f."matricNo"
        INNER JOIN public."Program_Registration" r
        ON r."programID" = f."programID"
        INNER JOIN public."Kuliyyah" k
        ON s."kuliyyah" = k."kuliyyah_code"
        WHERE f."programID" = ${body['programID']}
    `

    console.log(result1);

    const data = {
        programName: result1[0]['programName'],
        status: result1[0]['approvedStatus'],
        feedbacks: result
    }

    console.log(data);
    

    return data
});

// INSERT INTO public."StudentFeedback" ("matricNo", "rating", "feedback", "time", "programID") VALUES ('2116893', 5, 'Ibadah Camp is a good program and enjoyable!', (timestamp '2023-02-15 09:00:00'), 1);
// INSERT INTO public."StudentFeedback" ("matricNo", "rating", "feedback", "time", "programID") VALUES ('2015238', 4, 'The taaruf program was a great ice breaker', (timestamp '2023-02-16 10:00:00'), 1);
// INSERT INTO public."StudentFeedback" ("matricNo", "rating", "feedback", "time", "programID") VALUES ('2119279', 1, 'Terrible management and schedule', (timestamp '2023-02-14 03:30:00'), 1);
// INSERT INTO public."StudentFeedback" ("matricNo", "rating", "feedback", "time", "programID") VALUES ('2112011', 5, 'A totally fun and exciting experience', (timestamp '2023-05-21 06:00:00'), 1);
// INSERT INTO public."StudentFeedback" ("matricNo", "rating", "feedback", "time", "programID") VALUES ('2119279', 5, 'Highly recommended program and looking forward to the next one', (timestamp '2023-02-16 08:00:00'), 1);
// INSERT INTO public."StudentFeedback" ("matricNo", "rating", "feedback", "time", "programID") VALUES ('2117542', 3, 'Overall mediocre experience', (timestamp '2023-06-19 01:00:00'), 1);
// INSERT INTO public."StudentFeedback" ("matricNo", "rating", "feedback", "time", "programID") VALUES ('2115227', 2, 'Broke my leg due to it’s dangerous activities', (timestamp '2023-03-17 05:00:00'), 1);
// INSERT INTO public."StudentFeedback" ("matricNo", "rating", "feedback", "time", "programID") VALUES ('2111234', 5, 'Great!',(timestamp '2023-02-16 09:00:00'), 1);
// INSERT INTO public."StudentFeedback" ("matricNo", "rating", "feedback", "time", "programID") VALUES ('2114326', 4, 'Good', (timestamp '2023-08-02 09:00:00'), 1);
// INSERT INTO public."StudentFeedback" ("matricNo", "rating", "feedback", "time", "programID") VALUES ('2118081', 5, 'A wonderful experience',(timestamp '2023-04-23 02:00:00'), 1);

import { inspect } from "util";
import sql from "~/utils/postgresql";
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {

    const result = await sql`
        select r."matricNo", r."studentName", r."emailAddress", r."phoneNumber", k."kuliyyah_name", f."feedbackID", p."programName", p."programID"
        FROM public."StudentRegistration" r
        INNER JOIN public."Kuliyyah" k
        ON r."kuliyyah" = k."kuliyyah_code"
        LEFT JOIN public."Program_Registration" p
        ON r."programID" = p."programID"
        LEFT JOIN public."StudentFeedback" f
        ON f."matricNo" = r."matricNo"
    `
    
    console.log(result);

    return result

})

// INSERT INTO public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus") VALUES('KOE', 'Ibadah Camp Engin', 5, 3000, TO_DATE('13-01-2023', 'DD-MM-YYYY'), 'PENDING');
// INSERT INTO public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus") VALUES('KICT', 'Taaruf Week', 4, 500, TO_DATE('11-02-2023', 'DD-MM-YYYY'), 'PENDING');
// INSERT INTO public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus") VALUES('KIRKHS', 'Islamic Forum', 6, 7200, TO_DATE('18-04-2023', 'DD-MM-YYYY'), 'PENDING');
// INSERT INTO public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus") VALUES('KAED', 'Color Run', 5, 7000, TO_DATE('15-08-2023', 'DD-MM-YYYY'), 'PENDING');
// INSERT INTO public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus") VALUES('KOM', 'Malaysian Medical Summit', 8, 5500, TO_DATE('01-11-2023', 'DD-MM-YYYY'), 'PENDING');
// INSERT INTO public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus") VALUES('KOED', 'STEM Field Day', 5, 7000, TO_DATE('18-12-2023', 'DD-MM-YYYY'), 'PENDING');
// INSERT INTO public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus") VALUES('KOM', 'Medical Student Symposium', 8, 3000, TO_DATE('24-02-2023', 'DD-MM-YYYY'), 'PENDING');
// INSERT INTO public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus") VALUES('CELPAD', 'International Language Week', 20, 2000, TO_DATE('09-06-2023', 'DD-MM-YYYY'), 'PENDING');
// INSERT INTO public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus") VALUES('AIKOL', 'Importance and Challenges in Syariah Law', 6, 6000, TO_DATE('13-05-2023', 'DD-MM-YYYY'), 'PENDING');
// INSERT INTO public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus") VALUES('KAED', 'KAED Community Week', 20, 7000, TO_DATE('18-08-2023', 'DD-MM-YYYY'), 'PENDING');
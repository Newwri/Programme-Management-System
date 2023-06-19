import { inspect } from "util";
import sql from "~/utils/postgresql";
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {

    const result = await sql`
        select r."programID", r."programName", r."programDuration", r."estimatedBudget", r."programDate", r."approvedStatus", r."fundAllocated", r."kulliyyahNickname", COUNT(f."programID") as "feedbackCount"
        from "Program_Registration" r
        INNER JOIN "Kuliyyah" k
        ON k."kuliyyah_code" = r."kulliyyahNickname"
        LEFT JOIN public."StudentFeedback" f
        ON f."programID" = r."programID"
        GROUP BY f."programID", r."programID"
    `

    console.log(result);
    
    return result

})

// INSERT INTO public."Kuliyyah" ("kuliyyah_code", "kuliyyah_name") VALUES ('KOE', 'Kulliyyah of Engineering');
// INSERT INTO public."Kuliyyah" ("kuliyyah_code", "kuliyyah_name") VALUES ('KICT', 'Kulliyyah of Information and Technologies');
// INSERT INTO public."Kuliyyah" ("kuliyyah_code", "kuliyyah_name") VALUES ('KIRKHS', 'Kulliyyah Of Islamic Revealed Knowledge and Human Sciences');
// INSERT INTO public."Kuliyyah" ("kuliyyah_code", "kuliyyah_name") VALUES ('AIKOL', 'Ahmad Ibrahim Kulliyyah of Laws');
// INSERT INTO public."Kuliyyah" ("kuliyyah_code", "kuliyyah_name") VALUES ('KAED', 'Kulliyyah of Architecture and Environmental Design');
// INSERT INTO public."Kuliyyah" ("kuliyyah_code", "kuliyyah_name") VALUES ('CELPAD', 'Centre for Languages and Pre-University Academic');
// INSERT INTO public."Kuliyyah" ("kuliyyah_code", "kuliyyah_name") VALUES ('KOED', 'Kulliyyah of Education');
// INSERT INTO public."Kuliyyah" ("kuliyyah_code", "kuliyyah_name") VALUES ('KENMS', 'Kulliyyah of Economics and Management Sciences');
// INSERT INTO public."Kuliyyah" ("kuliyyah_code", "kuliyyah_name") VALUES ('KOM', 'Kulliyyah of Medicine');
// INSERT INTO public."Kuliyyah" ("kuliyyah_code", "kuliyyah_name") VALUES ('KON', 'Kulliyyah of Nursing');

// CREATE TABLE public."PROGRAM_REGISTRATION" ( 
//     programID NUMBER PRIMARY KEY, 
//     kulliyyahNickname VARCHAR2(7) NOT NULL, 
//     programName VARCHAR2(50) NOT NULL, 
//     programDuration SMALLINT NOT NULL, 
//     estimatedBudget INT CONSTRAINT eb_ck CHECK (estimatedBudget <= 10000), 
//     programDate DATE NOT NULL, 
//     approvedStatus VARCHAR2(50) DEFAULT 'Waiting For Approval', 
//     fundAllocated INT DEFAULT 0 CONSTRAINT fa_ck CHECK (fundAllocated <= 10000), 
// FOREIGN KEY(kulliyyahNickname) REFERENCES KULLIYYAH(kulliyyahNickname)
// ); 

// INSERT INTO public."Program_Registration" ("programID", "kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate") VALUES(1, 'KOE', 'Ibadah Camp Engin', 5, 3000, TO_DATE('13-01-2023', 'DD-MM-YYYY'));
// INSERT INTO public."Program_Registration" ("programID", "kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate") VALUES(2, 'KICT', 'Taaruf Week', 4, 500, TO_DATE('11-02-2023', 'DD-MM-YYYY'));
// INSERT INTO public."Program_Registration" ("programID", "kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate") VALUES(3, 'KIRKHS', 'Islamic Forum', 6, 7200, TO_DATE('18-04-2023', 'DD-MM-YYYY'));
// INSERT INTO public."Program_Registration" ("programID", "kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate") VALUES(4, 'KAED', 'Color Run', 5, 7000, TO_DATE('15-08-2023', 'DD-MM-YYYY'));
// INSERT INTO public."Program_Registration" ("programID", "kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate") VALUES(5, 'KOM', 'Malaysian Medical Summit', 8, 5500, TO_DATE('01-11-2023', 'DD-MM-YYYY'));
// INSERT INTO public."Program_Registration" ("programID", "kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate") VALUES(6, 'KOED', 'STEM Field Day', 5, 7000, TO_DATE('18-12-2023', 'DD-MM-YYYY'));
// INSERT INTO public."Program_Registration" ("programID", "kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate") VALUES(7, 'KOM', 'Medical Student Symposium', 8, 3000, TO_DATE('24-02-2023', 'DD-MM-YYYY'));
// INSERT INTO public."Program_Registration" ("programID", "kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate")VALUES(8, 'CELPAD', 'International Language Week', 20, 2000, TO_DATE('09-06-2023', 'DD-MM-YYYY'));
// INSERT INTO public."Program_Registration" ("programID", "kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate") VALUES(9, 'AIKOL', 'Importance and Challenges in Syariah Law', 6, 6000, TO_DATE('13-05-2023', 'DD-MM-YYYY'));
// INSERT INTO public."Program_Registration" ("programID", "kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate") VALUES(10, 'KAED', 'KAED Community Week', 20, 7000, TO_DATE('18-08-2023', 'DD-MM-YYYY'));

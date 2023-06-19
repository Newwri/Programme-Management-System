import { inspect } from "util";
import sql from "~/utils/postgresql";
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {

    const result = await sql`
        select r."programID", r."programName", r."programDuration", r."estimatedBudget", r."programDate", r."approvedStatus", r."fundAllocated", k."kuliyyah_name", COUNT(s."studentName") as "totalStudents"
        from "Program_Registration" r
        INNER JOIN "Kuliyyah" k
        ON k."kuliyyah_code" = r."kulliyyahNickname"
        LEFT JOIN public."StudentRegistration" s
        ON s."programID" = r."programID"
        WHERE r."approvedStatus" = 'APPROVED'
        GROUP BY s."programID", r."programID", k."kuliyyah_name"
    `

    console.log(result);
    
    return result

})

// r."programID", r."programName", r."programDuration", r."estimatedBudget", r."programDate", r."approvedStatus", r."fundAllocated", r."kulliyyahNickname" 
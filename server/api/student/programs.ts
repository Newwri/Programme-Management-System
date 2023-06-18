import { inspect } from "util";
import sql from "~/utils/postgresql";
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {

    const result = await sql`
        select r."programID", r."programName", r."programDuration", r."estimatedBudget", r."programDate", r."approvedStatus", r."fundAllocated", r."kulliyyahNickname" 
        from "Program_Registration" r
        INNER JOIN "Kuliyyah" k
        ON k."kuliyyah_code" = r."kulliyyahNickname"
        WHERE r."approvedStatus" = 'APPROVED'
    `

    console.log(result);
    
    return result

})
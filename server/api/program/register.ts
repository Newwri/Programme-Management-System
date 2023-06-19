import { inspect } from "util";
import sql from "~/utils/postgresql";
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const result2 = await sql`
        insert into public."Program_Registration" ("kulliyyahNickname", "programName", "programDuration", "estimatedBudget", "programDate", "approvedStatus")
        VALUES (${body['kuliyyahID']}, ${body['programName']}, ${body['duration']}, ${body['budget']}, ${body['programDate']}, 'PENDING')
    `
    
    return {
        result: 'OK',
    }

})
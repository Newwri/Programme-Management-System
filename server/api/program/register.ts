import { inspect } from "util";
import sql from "~/utils/postgresql";
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const programID = nanoid(16)

    const programData = {
        programID: programID,
        programName: body['programName']
    }

    const result = await sql`
        insert into public."Program_Modules" ${sql(programData, 'programID', 'programName')}

        returning *
    `

    const result2 = await sql`
        insert into public."Program_Registration" ("kuliyyahID", "programID", "programDuration", "estimatedBudget", "programDate", "approvedStatus")
        VALUES (${body['kuliyyahID']}, ${programID}, ${body['duration']}, ${body['budget']}, ${body['programDate']}, 'PENDING')
    `
    
    return {
        result: 'OK',
    }

})
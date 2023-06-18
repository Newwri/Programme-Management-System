import { inspect } from "util";
import sql from "~/utils/postgresql";
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    
    let status: string;

    if (!body['status']) {
        
        setResponseStatus(event, 400)

        return {
            message: 'Bad request'
        }

    }
    else if (body['status'] === 'PENDING') {
        status = 'PENDING'
    }
    else if (body['status'] === 'APPROVED') {
        status = 'APPROVED'
    }
    else if (body['status'] === 'REJECTED') {
        status = 'REJECTED'
    }
    else {
        status = 'REJECTED'
    }

    const programID = body['programID']

    const result = await sql`
        UPDATE public."Program_Registration"
        SET "approvedStatus" = ${status}
        WHERE "programID" = ${programID}
    `

    console.log('UPDATED');

    return {
        message: 'Updated'
    }

})
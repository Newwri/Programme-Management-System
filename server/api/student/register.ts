import { inspect } from "util";
import sql from "~/utils/postgresql";
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const data = {
        matricNo: body['matricNumber'],
        studentName: body['studentName'],
        emailAddress: body['emailAddress'],
        phoneNumber: body['phoneNumber'],
        kuliyyah: body['kuliyyah'],
        programID: body['programID']
    }

    const result = await sql`
    INSERT INTO public."StudentRegistration" ${sql(data)}
    `
    
    return {
        message: 'OK'
    }

})
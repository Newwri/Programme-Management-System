import { inspect } from "util";
import sql from "~/utils/postgresql";
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {

    const result = await sql`
        select r."matricNo", r."studentName", r."emailAddress", r."phoneNumber", k."kuliyyah_name"
        FROM public."StudentRegistration" r
        INNER JOIN public."Kuliyyah" k
        ON r."kuliyyah" = k."kuliyyah_code";
    `
    
    console.log(result);

    return result

})
import sql from "~/utils/postgresql";

export default defineEventHandler(async (event) => {

    if (getMethod(event) !== 'DELETE') {

        setResponseStatus(event, 405)

        return {
            message: 'Unsupported method.'
        }
    }

    const body = await readBody(event)

    const result = await sql`
        DELETE FROM public."Program_Registration" r
        WHERE r."programID" = ${body['programID']}
    `
    
    return {
        data: result
    }

})
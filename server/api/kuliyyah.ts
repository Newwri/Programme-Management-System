import postgres from "postgres";
import sql from "~/utils/postgresql";

export default defineEventHandler(async (event) => {

    const result = await sql`
        select * from public."Kuliyyah";
    `

    return result
});

import postgres from "postgres";

const sql = postgres({
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '51225119',
    database: 'pms'
})

export default sql
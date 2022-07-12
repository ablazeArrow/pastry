import { Pool } from "pg";
import {DB_HOST, DB_PORT, DB_DEV, DB_TEST, DB_USER, PASSWORD, ENV} from "./config";


const client = new Pool({
    host: DB_HOST,
    port: parseInt(DB_PORT as string),
    database: ENV === 'dev'? DB_DEV : DB_TEST,
    user: DB_USER,
    password: PASSWORD    
})


export default client

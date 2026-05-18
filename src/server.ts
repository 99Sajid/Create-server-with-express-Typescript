import express, { type Application, type Request, type Response } from "express"
import  {Pool} from "pg";
const app : Application = express()
const port = 5000

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

const pool = new Pool({
    connectionString:
    "postgresql://neondb_owner:npg_N4PMileXa1Bo@ep-old-art-apyn5y97-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})
const initDB=async()=>{
    try{
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        birth_year INT,
        country VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()

);
            `)
            console.log("Database initialized successfully");
    }catch(error){
        console.error("Error initializing database:",error);
    }
}

initDB();
app.get('/', (req :Request, res:Response) => {
//   res.send('Nodejs is running')
res.status(200).json({  name: "John x Doe",
  email: "john.doe@example.com" 
})
});
app.post("/",async(req:Request,res:Response)=>{
     //console.log(req.body);
     const {name,Email,Email1}=req.body;
     res.status(201).json({
        message:"Created",
        data:{
            name,
            Email,
        },
     })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

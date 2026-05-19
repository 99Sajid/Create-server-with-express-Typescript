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
app.post("/api/users",async(req:Request,res:Response)=>{
    // console.log(req.body);
     const {id,name,birth_year,country}=req.body;
     const result=await pool.query(`
        INSERT INTO users(name,birth_year,country) VALUES($1,$2,$3) RETURNING id
        `,[name,birth_year,country]);
        console.log(result);
     res.status(201).json({
        message:"User Created successfully",
        data:result.rows[0],
     })
});
app.get("/api/users",async(req:Request,res:Response)=>{
    try{
        const result=await pool.query(`
        SELECT * FROM users
        `);
        res.status(200).json({
            success:true,
            message:"Users retrived successfully",
            data: result.rows,
        })
    }catch(error:any){
        res.status(500).json({
            sucess:false,
            message:error.message,
            error:error,
        })
    }
});
app.get("/api/users/:id",async(req:Request,res:Response)=>{
    const {id}=req.params;
    try{
        const result=await pool.query(`
        SELECT * FROM users WHERE id=$1
        `,[id]);
        if(result.rows.length===0){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"User retrieved successfully",
            data: result.rows[0],
        })
    }catch(error:any){
        res.status(404).json({
            success:false,
            message:error.message,
            error:error,
        })
    }
});

app.put("/api/users/:id",async(req:Request,res:Response)=>{
    const {id}=req.params;
    const{name,birth_year,country}=req.body;
    try{
        const result=await pool.query(`
        UPDATE users SET name=$1, birth_year=$2, country=$3, updated_at=NOW() WHERE id=$4 RETURNING *
        `,[name,birth_year,country,id]);
        if(result.rows.length===0){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"User updated successfully",
            data: result.rows[0],
        })
    }catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message,
            error:error,
        })
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

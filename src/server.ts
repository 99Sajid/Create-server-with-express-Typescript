import express, { type Application, type Request, type Response } from "express"
import  {Pool} from "pg";
const app : Application = express()
const port = 5000

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

const pool = new Pool({
    connectionString:"postgresql://neondb_owner:npg_N4PMileXa1Bo@ep-old-art-apyn5y97-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})



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

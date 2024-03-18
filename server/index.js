import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from 'openai';
// import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


app.get("/",(req,res)=>{
    return res.status(200).send("The server is up!");
})

app.post("/generate", async (req, res) => {
    const { prompt, size } = req.body;
    //    validation
    if (!prompt || !size) {
       return res.status(400).send("Bad Request");
    }
    try {
      console.log("Entered in try");
      const response = await openai.images.generate({
         prompt,
         n: 1,
         size,
       });

      const imageUrl = response.data[0].url;
       console.log("The url : " + imageUrl);
      return res.status(200).send({ src: imageUrl });

      } catch (error) {
         console.log("Entered in catch");
        console.log(error);
        return res.status(500).send({ error:error.message });
      }
 });

const port = process.env.PORT || 3002;

app.listen(port ,()=>{
    console.log(`The server is running on port ${port}`);
})



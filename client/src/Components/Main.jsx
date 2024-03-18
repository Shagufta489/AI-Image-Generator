import React, { useState } from 'react'
import axios from "axios";
import "./main.scss";

import {
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Snackbar,
    Alert,
    CircularProgress,
 } from "@mui/material";


 const sizes = {
    small: "256x256",
    medium: "512x512",
    large: "1024x1024"
 }

const Main = () => {

    const [prompt, setPrompt] = useState("");
    const [size,setSize] = useState(sizes.medium);
    const [open,setOpen] = useState(false);
    const [img,setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const clickHandler = async () =>{
        try {
            if(prompt === ""){
                setOpen(true);
                return;
            }
            setLoading(true);
            console.log({prompt, size});
            const url = "http://localhost:3001/generate";
            const data = {prompt, size};
            const response = await axios.post(url, data);
            const imgSrc = response.data.src;
            setImg(imgSrc);
            setLoading(false);
        } catch (error) {
            setOpen(true);
            setLoading(false);
            return;
        }
    } 

  return (
    <>
      <div className="main">
         <Stack spacing={1} className="main-stack">
            <TextField label="Prompt" variant="outlined" value={prompt} onChange={(e)=>setPrompt(e.target.value)}/>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                <Select 
                    value={size} 
                    label='Size' 
                    onChange={(e)=>setSize(e.target.value)}
                >
                    <MenuItem value={sizes.small}>Small</MenuItem>
                    <MenuItem value={sizes.medium}>Medium</MenuItem>
                    <MenuItem value={sizes.large}>Large</MenuItem>
                </Select>

                <Button variant="contained" onClick={clickHandler} sx={{ mt: "1rem" }}>
                  Generate New Image
               </Button>
            </FormControl>
         </Stack>


         {loading && <CircularProgress color="success" sx={{ mt: "1rem" }} />}

         {img !== "" && <img src={img} alt="img" />}
    

         <Snackbar open={open} autoHideDuration={1000} onClose={()=>setOpen(false)} message="Note archived">
            <Alert severity="error">Prompt is empty..Enter your image description</Alert>
         </Snackbar>
      </div>
    </>
  )
}

export default Main

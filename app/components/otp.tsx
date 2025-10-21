import { useState } from "react"

export default function OTP({textLength=6}) { 
const [textData,setTextData]= useState( new Array(textLength).fill(""));
    return (
        <div className="flex items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold">OTP Component</h1>
            {textData.map((item,index)=>{
                return <input type="text" key={index} value={item}></input>
            })}
        </div>
        )
}
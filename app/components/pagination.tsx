"use client";
import { useEffect, useState } from "react";
import { Product } from "../interface/products.interface";

export default function Pagination(){

const [data, setData] = useState<Product[]>([]);
    const fetchData= async ()=>{
        try {
        const data= await fetch("https://dummyjson.com/products?limit=200");
        const res= await data.json();
        setData(res.products);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }
    useEffect(()=>{
        fetchData();
    },[])


    return !data.length  ? <> No Prodcut found</> :(
             <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <ul className="list-disc list-inside">
          {data.map((product) => (
            <li key={product.id} className="mb-2">
              <span className="font-semibold">{product.name}</span> - ${product.price}
            </li>
            ))}
        </ul>
        <div className="flex items-center justify-between w-full">
      <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Previous
      </button>
      <span className="text-sm text-gray-600">Page 1 of 10</span>
      <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Next
      </button>
      </div>
        </div>
)
}
"use client";
import { useEffect, useState } from "react";
import { Product } from "../interface/products.interface";
const PAGE_SIZE = 12; // Number of products per page


export default function Pagination(){

const [data, setData] = useState<Product[]>([]);
const [currentPage, setCurrentPage] = useState(0);
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

const totalPages = Math.ceil(data.length / PAGE_SIZE);
const paginatedData = data.slice(0, PAGE_SIZE); // Get the first PAGE_SIZE products
const startIndex = currentPage * PAGE_SIZE; //data.slice(0,12) here 0 is the start index and 12 is the end index
const endIndex = startIndex + PAGE_SIZE;

if (totalPages === 0) {
    return <div className="flex items-center justify-center w-full h-full">No Products found</div>;
}
const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
}
const Pre =()=>{
    setCurrentPage((pre)=> pre-1);
}
const Next=()=>{
    setCurrentPage((pre)=> pre+1);
}

    return (
             <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {data.slice(startIndex,endIndex).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex items-center justify-between w-full">
         <button disabled={currentPage===0} className="text-sm text-gray-600" onClick={()=>Pre()}>
            previous 
         </button>
         {
        [...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleCurrentPage(page)} // page is zero-indexed, so we add 1
            >
             <span>{page}</span>
            </button>
            ))}
          <button disabled={currentPage===totalPages} className="text-sm text-gray-600" onClick={()=>Next()}>
            next 
         </button>
      </div>
        </div>
)
}

const ProductCard= ({ product }: { product: Product })=> {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p>{product.description}</p>
      <p className="text-gray-500">Category: {product.category}</p>
      <p className="text-green-600">${product.price}</p>
    </div>
  );
}
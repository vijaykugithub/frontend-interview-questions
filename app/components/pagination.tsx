"use client";
import { useEffect, useState } from "react";
import { Product } from "../interface/products.interface";
const PAGE_SIZE = 12; // Number of products per page


export default function Pagination() {

    const [data, setData] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const fetchData = async () => {
        try {
            const data = await fetch("https://dummyjson.com/products?limit=200");
            const res = await data.json();
            setData(res.products);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }
    useEffect(() => {
        fetchData();
    }, [])

    const totalPages = Math.ceil(data.length / PAGE_SIZE);
    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    if (totalPages === 0) {
        return <div className="flex items-center justify-center w-full h-full">No Products found</div>;
    }
    const handleCurrentPage = (page: number) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    }
    const Pre = () => {
        if (currentPage > 0) setCurrentPage((pre) => pre - 1);
    }
    const Next = () => {
        if (currentPage < totalPages - 1) setCurrentPage((pre) => pre + 1);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {data.slice(startIndex, endIndex).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="flex items-center justify-between w-full mt-4">
                <button type="button" disabled={currentPage === 0} className="text-sm text-gray-600 px-2 py-1" onClick={Pre}>
                    Previous
                </button>
                <div className="flex gap-1">
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            type="button"
                            key={page}
                            className={`px-4 py-2 rounded hover:bg-blue-600 focus:outline-none ${currentPage === page ? 'bg-blue-700 text-white font-bold' : 'bg-blue-500 text-white'}`}
                            onClick={() => handleCurrentPage(page)}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            <span>{page + 1}</span>
                        </button>
                    ))}
                </div>
                <button type="button" disabled={currentPage === totalPages - 1} className="text-sm text-gray-600 px-2 py-1" onClick={Next}>
                    Next
                </button>
            </div>
        </div>
    )
}

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="border p-2 rounded shadow text-sm">
            <h2 className="text-base font-semibold mb-1">{product.title}</h2>
            <p className="mb-1">{product.description}</p>
            <p className="text-gray-500 mb-1">Category: {product.category}</p>
            <p className="text-green-600">${product.price}</p>
        </div>
    );
}
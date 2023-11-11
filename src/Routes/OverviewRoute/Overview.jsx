import { useEffect, useState } from "react";

const Overview = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setAllProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                allProducts && allProducts.products && allProducts.products.length > 0 ? (
                    allProducts.products.map((product) => (
                        <p key={product.id}>{product.title}</p>
                    ))
                ) : (
                    <p>No products found.</p>
                )
            )}
        </div>
    );
};

export default Overview;
import "./Overview.css"
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
        <div className="mainOverview">
        <div className="wholeAllProducts">
        <h1>All products</h1>
        <div className="productsContainer">
            {loading ? (
                <p>Loading...</p>
            ) : (
                allProducts && allProducts.products && allProducts.products.length > 0 ? (
                    allProducts.products.map((product) => (
                        <div  key={product.id} className="productThumbnail">
                        <div className="titleContainer">
                        <p className="productTitle" key={product.id}>{product.title}</p>
                        </div>
                        <div className="imageContainer">
                        <img className="productImage" src={product.images[0]} alt="" />
                        </div>
                        <div className="priceContainer">{product.price}.-</div>
                        <div className="thumbnailButtons">
                            <button>add to cart</button>
                            <button>see details</button>
                        </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )
            )}
        </div>
        </div>
        </div>
    );
};

export default Overview;
import React, { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import ProductContext from "../../ContextAPIs/ProductsContext";
import { UsersContext } from "../../ContextAPIs/UsersContext";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const {UsersData}=useContext(UsersContext);
  console.log(UsersData);
  const { products, getProducts, deleteProduct } = useContext(ProductContext);
  return (
    <div className="py-5">
      <input
        className="form-control d-block m-auto w-50 p-2 fs-4"
        id="searchInput"
        type="search"
        placeholder="Search here..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <div className="container m-auto mt-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products
            .filter((p) => {
              if (searchTerm === "") {
                return p;
              } else if (
                p.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return p;
              }
            })
            .map((prodcutItem) => {
              return (
                // ProductCard
                <ProductCard
                  getProducts={getProducts}
                  deleteProduct={deleteProduct}
                  key={prodcutItem.id}
                  product={prodcutItem}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Shop;

import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
  let [products, setProducts] = useState([]);
  const { children } = props;
  let navigator = useNavigate();

  let getProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  let getProductById = (productId) => {
    axios
      .get(`http://localhost:5000/products/${productId} `)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  let deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:5000/products/${productId}`)
      .then(() => getProducts())
      .catch((err) => console.log(err));
  };
  let editProduct = (productId,prdct) => {
    axios.patch(`http://localhost:5000/products/${productId}`, prdct).then(
      ()=>getProducts()
    ).catch((err) => console.log(err));
  };

  let addProduct = (product) => {
    axios.post(`http://localhost:5000/products`, product).then(
      () => getProducts()
    ).catch((err) => console.log(err));
    navigator("/shop");
  };
  useEffect(() => {
    getProducts();
  }, []);
  const contextValue = useMemo(() => ({ products }), [products]);
  return (
    <ProductsContext.Provider
      value={{
        products: contextValue.products,
        setProducts,
        getProducts,
        getProductById,
        deleteProduct,
        addProduct,
        editProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;

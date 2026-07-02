import React, { createContext, useContext, useState, useEffect } from 'react';
import { plants as defaultPlants } from '../data/plants';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(defaultPlants);

  useEffect(() => {
    setProducts(defaultPlants);
  }, [defaultPlants]);

  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: Date.now(),
      rating: 5.0,
      reviewCount: 0,
      stock: 'In Stock'
    };
    setProducts([product, ...products]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

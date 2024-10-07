import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import "./index.css";
import { getMockData, MockData } from "./mocks/mockData";
import { Loading } from "./components/Loading";
import { Product } from "./components/Product";

function App() {
  const [products, setProducts] = useState<MockData[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const totalPrice = products
    .map((product) => product.price)
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    setIsLoading(true);

    const res = await getMockData(page);
    const newProducts = [...products, ...res.datas];
    setProducts(newProducts);
    setIsEnd(res.isEnd);

    setIsLoading(false);
  };

  const observerCallback: IntersectionObserverCallback = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && !isLoading) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 1.0,
    });

    if (targetRef.current && !isEnd) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="App">
      <div className="text-xl z-2 fixed top-0 left-0 w-full bg-blue-500 text-white p-2">
        total price: {totalPrice}
      </div>
      <div className="p-10">
        {products.map((product, index) => (
          <Product key={product.productId} {...product} />
        ))}
      </div>
      {isLoading && <Loading />}
      <div ref={targetRef}></div>
    </div>
  );
}

export default App;

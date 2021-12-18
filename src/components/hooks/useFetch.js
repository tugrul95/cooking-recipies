import { useState, useEffect } from "react";

function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  // set Post request options
  const postData = (recipe) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
  };

  useEffect(() => {
    //   initiate abort controller
    const controller = new AbortController();

    const fetchData = async (requestOptions) => {
      setIsLoading(true);

      try {
        const res = await fetch(url, {
          ...requestOptions,
          signal: controller.signal,
        });
        // Check for fetch error
        if (!res.ok) throw new Error("Failed to fetch data");
        // Store data
        const jsonData = await res.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (err) {
        //   check if error is abort error
        if (err.name === "AbortError") {
          console.log("Fetch request cancelled");
        } else {
          setError(err.message);
        }
        setIsLoading(false);
      }
    };

    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    // return ability to abort
    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, isLoading, error, postData };
}

export default useFetch;

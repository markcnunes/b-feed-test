import React, { useCallback, useState, useEffect } from "react";
import Feed from "./components/Feed";

const API = process.env.REACT_APP_API;

const Data = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [itemsByID, setItemsByID] = useState({});

  const fetchUrl = useCallback(
    async (url) => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const body = await res.json();

        // Retrieve only new data
        // Save ids to increase performance
        let newItems = [];
        setData((prevState) => {
          body.forEach((item) => {
            if (!itemsByID.hasOwnProperty(item.id)) {
              itemsByID[item.id] = item.id;
              setItemsByID(itemsByID);
              newItems.push(item);
            }
          });
          return [...newItems, ...prevState];
        });

        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);

        // Wait four seconds before trying it again
        setTimeout(() => fetchUrl(url), 4000);
      }
    },
    [itemsByID]
  );

  // First fetch
  useEffect(() => {
    fetchUrl(API + "count=10&afterId=" + 0);
  }, [fetchUrl]);

  // Fetch every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchUrl(API + "count=1&afterId=" + data[0].id);
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchUrl, data]);

  return loading ? "Loading..." : <Feed data={data} />;
};

export default Data;

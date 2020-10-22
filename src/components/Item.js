import React from "react";

const Item = ({ item }) => {
  return (
    <li key={`twitter-${item.id}`} className="feed--item">
      <div
        className="feed--item__avatar"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <img alt={item.username} src={item.image} />
      </div>
      <div className="feed--item__body">
        <h3>{item.username}</h3>
        <p>{item.text}</p>
      </div>
    </li>
  );
};

export default Item;

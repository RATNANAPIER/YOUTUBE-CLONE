import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
{
  /*Creating multiple video card on web page using Feed component*/
  /*data,setData will be storing the data retriving from the API link of type array */
}
export const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };
  {
    /*to run the above the fetchdata function we useEffect
    whenever the category gets updated then fetData() is executed 
    then the updated category is stored in data state*/
  }
  useEffect(() => {
    fetchData();
  }, [category]);
  return (
    <div className="feed">
      {data.map((items, index) => {
        {
          /*Link-tag to add video page and add video path to TO-property  */
        }
        return (
          <Link
            to={`video/${items.snippet.categoryId}/${items.id}`}
            className="card"
          >
            <img src={items.snippet.thumbnails.medium.url} alt="" />
            <h2>{items.snippet.title}</h2>
            <h3>{items.snippet.channelTitle}</h3>
            <p>
              {value_converter(items.statistics.viewCount)} views &bull;
              {moment(items.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

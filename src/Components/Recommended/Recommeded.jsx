import React, { useState, useEffect } from "react";
import "./Recommended.css";

import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";

const Recommeded = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const realtedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(realtedVideo_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items));
  };
  //the function is executed when this component is renderFirst time first time by assigning empty array as second argument

  useEffect(() => {
    fetchData();
  }, []);

  //the api data will store the multiple videos and displayed those videos in the sidebar

  return (
    <div className="recommended">
      {apiData.map((item, index) => {
        return (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`} //{Link} It navigates to the video from the recommended videos on right side
            key={index}
            className="side-video-list"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommeded;

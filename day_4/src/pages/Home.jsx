/* eslint-disable react/prop-types */

import { Helmet } from "react-helmet";
import Blog from "./Blogs/Blog";

const Home = () => {
  const handelTime = () => {
    var time = new Date();
    console.log(
      time.toLocaleString("en-US", { hour: "numeric", hour12: true })
    );
  };
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <button onClick={handelTime}>Add</button>
      <Blog />
    </>
  );
};

export default Home;

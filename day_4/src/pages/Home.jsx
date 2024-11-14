/* eslint-disable react/prop-types */

import { Helmet } from "react-helmet";
import Blog from "./Blogs/Blog";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Blog />
    </>
  );
};

export default Home;

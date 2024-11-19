import { useLoaderData } from "react-router-dom";
import Header from "./Header";
import RightNav from "./layout-component/RightNav";
const News = () => {
  const data = useLoaderData();
  console.log(data.data[0]);
  const news = data.data[0];
  return (
    <>
      <Header />
      <main className="w-11/12 mx-auto pt-5 flex gap-3">
        <div>
          <figure className="w-full">
            <img src={news.image_url} className="w-full" alt="" />
          </figure>
          <h1 className="font-semibold text-2xl">{news.title}</h1>
          <p>{news.details}</p>
        </div>
        <div className="ml-10">
          <RightNav />
        </div>
      </main>
    </>
  );
};

export default News;

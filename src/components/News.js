import React, { useEffect , useState} from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {

  const [articles , setArticles] = useState([])
  const [loading , setLoading] = useState(true)
  const [page , setPage] = useState(1)
  const [totalResults , settotalResults] = useState(0)

  const capitlizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  
  const updateNews = async ()=> {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;

    // this.setState({ loading: true });
    setLoading(true)

    
    let data = await fetch(url);
    props.setProgress(30)
    let parsadata = await data.json();
    props.setProgress(70)

    console.log(parsadata);
    setArticles(parsadata.articles)
    setLoading(false)
    settotalResults(parsadata.totalResults)

    props.setProgress(100)

  }
  useEffect(()=>{
    document.title = `${capitlizeFirst(props.category)} - NewsBunny `;

    updateNews();
      //eslint-disable-next-line 
  },[])


  // handlePrevClick = async () => {
  // setPage(page-1)

  //   updateNews();

  // };

  // handleNextClick = async () => {
      // setPage(page+1)
  //   updateNews();
  // };

  const fetchMoreData = async () => {
      setPage(page+1)

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsadata = await data.json();
    console.log(parsadata);
    setArticles(articles.concat(parsadata.articles))
    settotalResults(parsadata.totalResults);
    
  };

    return (
      <>
        <h3 className="text-center " style={{ marginTop:"80px"}}>
          NewsBunny - Top {capitlizeFirst(props.category)} Headlines
        </h3>
        {loading && <Spiner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
        >
          <div className="container my-3">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    {/* <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} ImageUrl = {element.urlToImage} NewsUrl={element.url}/> */}
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      ImageUrl={element.urlToImage}
                      NewsUrl={element.url}
                      date={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }

News.defoultPropTypes = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;

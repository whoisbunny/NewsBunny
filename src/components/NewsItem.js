import React from "react";

const NewsItem =(props)=> {

    let {title, description , ImageUrl  ,NewsUrl ,author,date , source} = props;
    return (
      <>
        <div className="my-3">
          <div className="card" >
            <div style={{display:"flex", justifyContent:"flex-end",position:"absolute",right:"0" }}>

              <span className="  badge rounded-pill bg-dark" > 
              {source}</span>
            </div>
            <img src={!ImageUrl?"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg":ImageUrl} className="card-img-top max-height" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...
              </p>
              <p className="card-text"><small className="text-body-secondary"><b>By :  {!author?"Unknown":author}   On  {new Date(date).toGMTString()} </b> </small></p>
              <a href={NewsUrl} target="_blank"  rel="noreferrer" className="btn btn-sm text-center btn-dark">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }


export default NewsItem;

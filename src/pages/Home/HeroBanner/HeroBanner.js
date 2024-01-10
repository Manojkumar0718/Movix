import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./HeroBanner.scss"
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Image from '../../../components/LazyLoadImage/Image';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';

const HeroBanner = () => {

  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")

  const navigate = useNavigate()

  const { data, loading } = useFetch("/movie/upcoming")

  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)].backdrop_path
    setBackground(bg)
  }, [data])

  const SearchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className='heroBanner'>
      {!loading && <div className='backdrop-img'>
        <Image src={background} />
      </div>}
      <div className='opacity-layer'></div>
      <ContentWrapper>
        <div className='heroBannerContent'>
          <span className='title'>Welcome.</span>
          <span className='subTitle'>Millions of movies, TV shows and people to discover. Explore now.</span>
          <div className='searchInput'>
            <input
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={SearchQueryHandler}
              type='text'
              placeholder='Search for a movie or tv show...'
              style={{paddingLeft : "15px"}}
            />
            <button onClick={() =>navigate(`/search/${query}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner;

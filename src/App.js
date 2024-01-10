import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter , Route , Routes } from "react-router-dom"
import { fetchData } from './utils/Api';
import { useSelector, useDispatch } from 'react-redux';

import { getApiConfiguration, getGenres } from './store/HomeSlice';
 
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Explore from './pages/Explore/Explore';
import Details from './pages/Details/Details';
import SearchResult from './pages/SearchResult/SearchResult';
import PageNotFound from './pages/404/PageNotFound';

function App() {

  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home)

  useEffect(() => {
    fetchApiConfig();
    genersCall()
  }, [])

  const fetchApiConfig = () => {
    fetchData('/configuration')
      .then(response => {
        console.log(response)

        const url = {
          backdrop : response.images.secure_base_url + "original",
          poster : response.images.secure_base_url + "original",
          profile : response.images.secure_base_url + "original",
        }

        dispatch(getApiConfiguration(url))
      })
      .catch(error => console.log(error))
  }

  const genersCall = async () =>{
      let promises = []
      let endpoints = ["tv" , "movie"]
      let allgeners = {}

      endpoints.forEach((url) =>{
        promises.push(fetchData(`/genre/${url}/list`))
      })

      const data = await Promise.all(promises)

      data.map(({genres}) =>{
        return genres.map((item) => (allgeners[item.id] = item))
      })

      dispatch(getGenres(allgeners))

  }

  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element ={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;

import axios from "axios"

const baseURL = "https://api.themoviedb.org/3"

const TMDB_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmIyNzU2MGRhZWI0NmUwZmYwNTRhMjdjNTdmZGQzNSIsInN1YiI6IjY1OTY0MzFhODY5ZTc1NzAxODA2ODExNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IcVu4A-ox_vFa9j2dJWlsBqbnH2zXGr2MzECgXlk5mw"

const headers = {
    Authorization : "Bearer " + TMDB_TOKEN,
};


export const fetchData = async (url,params) =>{
    try{
        const {data} = await axios.get(baseURL + url , {
            headers,
            params
        })
        return data
        // console.log(data)
    } catch(err){
        console.log(err.err_msg)
    }
}




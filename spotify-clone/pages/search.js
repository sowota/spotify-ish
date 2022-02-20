import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Header from './../components/Header';
import useSpotify from './../hooks/useSpotify';
import Song from '../components/Song'
import Artist from './../components/Artist';
import { getSession } from "next-auth/react";




export default function Search({session}) {

    const spotifyApi = useSpotify()

    const[search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [artist, setArtist] = useState([])

    //console.log(searchResult)

    useEffect(() =>{
        if(!search) return setSearchResult([])
        if(spotifyApi.getAccessToken()){
            spotifyApi.searchTracks(search).then(data => setSearchResult(data.body.tracks.items.map(item =>({
                id:item.id,
                image:item.album?.images[1]?.url,
                name:item.name,
                artist:item.album.artists[0]?.name,
                uri:item.uri
            }))))  
        }
    }, [session, spotifyApi, search])

    useEffect(() =>{
        if(!search) return setArtist([])
        if(spotifyApi.getAccessToken()){
            spotifyApi.searchArtists(search).then(data => setArtist(data.body.artists.items.map(item => ({
                id:item.id,
                image: item.images[0]?.url,
                name:item.name
                
            }))))  
        }
    }, [session, spotifyApi, search])

    //for console 
    // useEffect(() =>{
    //     if(!search) return setSearchResult([])
    //     if(spotifyApi.getAccessToken()){
    //         spotifyApi.searchArtists(search).then(data => console.log(data.body.artists.items))  
    //     }
    // }, [session, spotifyApi, search])

    return (
        <div className="bg-[#121212] ">
            <Sidebar />
            <section className='bg-[#121212] h-screen overflow-y-scroll scrollbar-hide pl-[228px] py-4 space-y-8 w-full md:mr-2.5'>
                <div className="flex flex-grow mr-6 items-center max-w-[500px] bg-[#fafafa] rounded-full overflow-hidden border-2 border-[#333333] p-1.5 px-5 pr-8">
                    <div className="h-5 w-5 rounded-full border-black border-4 flex-shrink-0 mr-3 animate-pulse"/>
                    <input
                        type='text'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-[#fafafa] border-none focus:ring-0 outline-none placeholder-[#lalala] lg:w-full"
                        placeholder="What to listen?"
                    />
                </div>
                { searchResult.length &&
                <div>
                    <h1 className="text-white text-xl font-semibold mb-6">Songs</h1>
                    <div className="flex overflow-x-scroll gap-x-5 scrollbar-hide ">
                        {searchResult.map(song=>(
                            <Song song={song} key={song.id} />
                        ))}
                    </div>
                </div>
                }

                {artist.length && 
                 <div className="mb-8">
                    <h1 className="text-white text-xl font-semibold mb-6">Artists</h1>
                    <div className="flex overflow-x-scroll gap-x-5 scrollbar-hide ">
                        {artist.map(artist=>(
                            <Artist artist={artist} />
                        ))}
                    </div>
                 </div>
                 }

                 
            </section>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context);

    return{
        props:{
            session,
        }
    }
}


import {shuffle} from 'lodash'
import React from "react";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Header from './Header';
import useSpotify from './../hooks/useSpotify';
import NewRelease from './NewRelease';
import  Link from 'next/link';
import { isPlayingState, currentTrackIdState } from './../atoms/playerAtom';
import { useRecoilState } from 'recoil';
import Player from './Player';


export default function Center() {

    const{data: session} = useSession()
    const spotifyApi = useSpotify()

    const [newSongs, setNewSongs] = useState([])
    const [trend, setTrend] = useState([])


    // player atom
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)

    
//New release
    useEffect(() =>{
        if(spotifyApi.getAccessToken()){
            spotifyApi.getNewReleases({limit:50, country:['JP', 'US', 'UK']}).then(data => setNewSongs(data?.body?.albums?.items?.map(item =>({
                id:item.id,
                artist:item.artists[0].name,
                name:item.name,
                image:item.images[0]?.url,
                uri:item.uri
            }))))
       
        }
    }, [session, spotifyApi])
// top list 
    // useEffect(() =>{
    //     if(spotifyApi.getAccessToken()){
    //         spotifyApi.getCategory('toplists', {country:['JP', 'US', 'UK']}).then(data => setTrend(data.body.href))
       
    //     }
    // }, [session, spotifyApi])
//console 
    // useEffect(() =>{
    //     if(spotifyApi.getAccessToken()){
    //         spotifyApi.getNewReleases({limit:10, country:['JP', 'US', 'UK']}).then(data => console.log(data.body))
       
    //     }
    // }, [session, spotifyApi])
     
    const colors = [
        'from-indigo-500',
        'from-blue-500',
        'from-green-500',
        'from-red-500',
        'from-yellow-500',
        'from-pink-500',
        'from-purple-500'
    ]

    const [color, setColor] = React.useState(null)

    React.useEffect(() =>{
        setColor(shuffle(colors).pop())
    }, [])
  

    return (
        <div className=" flex-grow text-white h-screen w-full relative overflow-y-scroll scrollbar-hide">
            <Header />
            

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8 w-full`}>
            </section>
            <div className='pl-[14rem] pr-6 absolute w-full top-20 pb-[10rem] '>
                <h1 className='text-white text-2xl font-extrabold mb-7'>
                    New Release
                </h1>
                <div className='flex flex-wrap gap-7'>
                    {
                        newSongs.map(newSong =>(
                        
                                <NewRelease newSong={newSong} key={newSong.id}/>
                        ))
                    }

                </div>

            </div>
            <Player />

           
        </div>
    )
}

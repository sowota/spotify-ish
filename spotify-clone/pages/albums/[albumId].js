import React, { useEffect, useState } from 'react';
import Sidebar from './../../components/Sidebar';
import useAlbum from './../../hooks/useAlbum';
import { getSession, useSession } from 'next-auth/react';
import Track from '../../components/Track';
import useSpotify from './../../hooks/useSpotify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { albumState, currentTrackIdState } from '../../atoms/playerAtom';
import { albumIdState, isPlayingState } from './../../atoms/playerAtom';
import Player from '../../components/Player';
import Loading from '../../components/Loader';

export default function AlbumDetails() {

    const spotifyApi = useSpotify()
    const[album, setAlbum] = useRecoilState(albumState)
    const [albumId, setAlbumId] = useRecoilState(albumIdState)
    
    
    //console.log(albumId)
    //console.log(album)

    const{data:session} = useSession()
    //console.log(session)

    const[isPlaying, setIsPlaying] = useRecoilState(isPlayingState)


    const handlePlay = () =>{
        setIsPlaying(true)
       
    }

    useEffect(() =>{
        if(albumId){
          
            spotifyApi.getAlbum(albumId).then(data => {
                setAlbum(data.body)
            })
        }else{
            return
        }
    }, [spotifyApi, albumId])


  return (
    <section className='bg-gradient-to-b from-[#131313ce] to-[#000000f6] h-screen overflow-y-scroll scrollbar-hide'>
        <Sidebar />
         <div className='pl-[14rem] pt-7 pr-8 pb-[10rem]' onClick={handlePlay}>
            <div key={album?.id} className='flex gap-4 mb-11'>
                <img src={album?.images?.[0]?.url} className='w-[14rem]'></img>
                <div className='self-end'>
                    <p className='uppercase text-xs text-white lg:text-base'>{album?.type}</p>
                    <h1 className='text-4xl font-bold text-white lg:text-5xl'>{album?.name}</h1>
                    <div className="flex gap-1 mt-3">
                        <p className='capitalize font-bold text-white'>{album?.artists[0].name} |</p>
                        <p className='text-white'> {album?.total_tracks} songs</p>
                    </div>
                </div>
            </div> 

            <div>
                    {album?.tracks?.items.map(item => (
                        <Track key={item.id} item={item} />
                     ))
                    }
                </div>
        </div>
        <Player />

    </section>
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

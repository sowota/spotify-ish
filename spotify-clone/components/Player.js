import { FastForwardIcon, PauseIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon, VolumeUpIcon } from "@heroicons/react/outline";
import { PlayIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from './../atoms/playerAtom';
import useSpotify from "../hooks/useSpotify";
import useSongInfo from './../hooks/useSongInfo';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import useAlbum from './../hooks/useAlbum';
import music from '../public/music.png'
import Image from 'next/image'


import SpotifyPlayer from 'react-spotify-web-playback'


export default function Player() {

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const spotifyApi = useSpotify()
  const {data:session} = useSession()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [volume, setVolum] = useState(50)
  
  const audioPlayer = useRef()
  const songInfo = useSongInfo()
  const albumInfo = useAlbum()

  //console.log(albumInfo)

  // const handlePlay = () => {
  //   spotifyApi.getMyCurrentPlaybackState().then(data => {
  //     if(data.body.is_playing){
  //       spotifyApi.pause()
  //       setIsPlaying(false)
  //     }else {
  //       spotifyApi.play()
  //       setIsPlaying(true)
  //     }
  //   })

  // }

  // useEffect(()=>{
  //   if(isPlaying){
  //     audioPlayer.current.play()
  //   }else{
  //     audioPlayer.current.pause()
  //   }
  // }, [isPlaying])


  return (

        <div className="fixed z-50 left-0 bottom-0 right-0 bg-[#181818] flex items-center justify-between px-5 py-3">
          <audio src={`https://api.spotify.com/v1/albums/${albumInfo?.id}/${albumInfo?.uri}`}
          ref={audioPlayer}
          />
          <div className="flex items-center space-x-3"> 
            <Image src={albumInfo?.images?.[0]?.url || music} width={65} height={65} />
            <div className='max-w-[280px]'>
              <p className="text-white font-bold">
                {albumInfo?.name}
              </p>
              <p className="text-white">
                {albumInfo?.artists[0]?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 min-w-[320px]">
            <SwitchHorizontalIcon className="button" />
            <RewindIcon className="button"/>
            {isPlaying ?
              <PauseIcon  className="button w-12 h-12" onClick={setIsPlaying} />
            :
            <PlayIcon className="button w-14 h-14 active:scale-[0.8] duration-75 ease-out" />
            }
            <FastForwardIcon className="button"/>
            <ReplyIcon className="button"/>
          </div>
          <div className="flex gap-3">
            <VolumeUpIcon className="button w-8 h-8 " />
            <input type='range' min={0} max={100} />
          </div>
            
        </div>
    )
}

import useSpotify from "./useSpotify";
import { currentTrackIdState } from "../atoms/playerAtom";
import {useRecoilState} from 'recoil'
import { useEffect, useState } from "react";



export default function useSongInfo() {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)

    //console.log(currentTrackId)

    const[songInfo, setSongInfo] = useState(null)

    useEffect(() =>{
        const getSongInfo = async () =>{

            if(currentTrackId){
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, 
                {
                    headers:{
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }
                ).then(res=> res.json())

                setSongInfo(trackInfo)
            }
        }

        getSongInfo()
    }, [currentTrackId, spotifyApi])


  return songInfo;
}

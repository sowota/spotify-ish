import useSpotify from "./useSpotify";
import { albumIdState } from "../atoms/playerAtom";
import {useRecoilState} from 'recoil'
import { useEffect, useState } from "react";

export default function useAlbum() {
    const spotifyApi = useSpotify()
    const [albumId, setAlbumId] = useRecoilState(albumIdState)

    //console.log(albumId)

    const[album, setAlbum] = useState()

    useEffect(() =>{
        const getAlbumInfo = async () =>{

            if(albumId){
                const albumInfo = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, 
                {
                    headers:{
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }
                ).then(res=> res.json())

                setAlbum(albumInfo)
            }
        }

        getAlbumInfo()
    }, [albumId, spotifyApi])


  return album;
}

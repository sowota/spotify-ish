

import { useEffect } from 'react';
import  SpotifyWebApi  from 'spotify-web-api-node';
import { signIn, useSession } from 'next-auth/react';


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_SECRET_ID
})
export default function useSpotify() {

    const {data: session} = useSession()
    
    useEffect(()=>{
        if(session){
            //if refresh access token attempt fails, direct user to login
            if(session.error === "RefreshAccessTokenError"){
                signIn()
            }

            spotifyApi.setAccessToken(session.user.accessToken)
        }
    },[session])
    return spotifyApi
}

import { currentTrackIdState } from "../atoms/playerAtom";
import { isPlayingState } from './../atoms/playerAtom';
import useSpotify from './../hooks/useSpotify';
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { useEffect } from "react";



export default function Track({item}) {

    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)

    const {data:session} = useSession()
    //console.log(session)

    const[isPlaying, setIsPlaying] = useRecoilState(isPlayingState)


    const handlePlay = () =>{
        setCurrentTrackId(item.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris:[item.uri]
        })
    }

    // if(spotifyApi.getAccessToken()){        
    //     handlePlay()
    // }

       
  
    


    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

  return (

    <div className="flex items-center gap-3 max-w-[1200px] mb-4 p-3 rounded-md cursor-pointer hover:bg-[#00000034]"
                           
                            key={item.id}
                        >
        <p className='text-white'>{item.track_number}</p>
        <div className="flex w-full justify-between lg:text-xl">
            <h2 className='text-white'>{item?.name}</h2>
            <p className='text-white'>
                {millisToMinutesAndSeconds(item?.duration_ms)}
            </p>
        </div>
    </div>                        
  )

}



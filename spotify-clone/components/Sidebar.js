import {HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon, LogoutIcon} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import useSpotify from './../hooks/useSpotify';
import Link from 'next/link'
import ActiveLink from './common/ActiveLink'



function Sidebar() {

    const spotifyApi = useSpotify()
    const {data:session, status} = useSession() 
    const [playlists,setPlaylists] = useState([])
    

    //console.log(spotifyApi.getAccessToken())
    
    useEffect(() =>{
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then(data => setPlaylists(data.body.items))
        }
    }, [session, spotifyApi])

  //console.log(session)


    return (
        <div className='fixed top-0 left-0 w-48 z-40 bg-black text-gray-500 p-5 text-sm border-gray-900 overflow-y-scroll scrollbar-hide h-screen'>
            <Link href='/'>
                <div className='flex items-center w-full cursor-pointer'>
                    <Image src='/true.png' width={40} height={40}/>
                    <p className='text-white ml-3 font-extrabold text-base '>Spotify</p>
                </div>
            </Link>
            <div className='space-y-4 mt-6'>
                <ActiveLink href='/' activeClassName="text-white">
                    <button className='flex items-center space-x-2 hover:text-white'>
                        <HomeIcon className='h-5 w-5' />
                        <p className='text-base'>Home</p>
                    </button>
                </ActiveLink>
                <ActiveLink href='/search' activeClassName="text-white">
                    <button className='flex items-center space-x-2 hover:text-white'>
                        <SearchIcon className='h-5 w-5' />
                        <p className='text-base'>Search</p>
                    </button>
                </ActiveLink>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5' />
                    <p className='text-base'>Your Library</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'/>
                <button className='flex items-center space-x-2 hover:text-white' onClick={()=> signOut({callbackUrl:'/login'})}>
                    <LogoutIcon className='h-5 w-5' />
                    <p>Log out</p>
            </button>
               
                
                
            </div>
        </div>
    )
}

export default Sidebar

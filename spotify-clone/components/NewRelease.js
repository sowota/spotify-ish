import Image from 'next/image'
import { useRecoilState } from 'recoil';
import { albumIdState } from '../atoms/playerAtom';
import Center from './Center';
import {useState} from 'react'
import Link from 'next/link'

export default function NewRelease({newSong}) {

 //console.log(newSong)

  

  const [albumId, setAlbumId] = useRecoilState(albumIdState)
  

  //console.log(albumId)

  return (
    <Link href={`/albums/${newSong?.id}`}>
      <div className="flex-shrink-0 w-[200px] hover:bg-slate-900 cursor-pointer" >
          <div className='flex flex-col space-y-4'
               onClick={()=>setAlbumId(newSong.id)}
          >
              <img src={newSong?.image} className='w-full'/>
              <div className="flex flex-col justify-center pl-3">
                  <h2 className='text-white font-bold'>{newSong.name}</h2>
                  <p className='text-gray-500'>{newSong.artist}</p>
              </div>
          </div>
      </div>
    </Link>
  )
}

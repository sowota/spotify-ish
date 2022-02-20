
import Image from 'next/image';

export default function Song({song}) {
  return (
    <div  key={song.id} className="flex-none w-48 bg-gray-800 rounded-lg hover:bg-slate-700 cursor-pointer">
        <div className='flex flex-col items-center space-y-3  mt-2' >
            <img src={song?.image} className='self-center flex-1 rounded-full w-[150px]'/>
            <div className="flex flex-col flex-1 mx-3 pb-3 ">
                <h2 className='text-white w-40 truncate '>{song.name}</h2>
                <p className='text-gray-400 '>{song.artist}</p>
            </div>
        </div>
    </div>
    )
}

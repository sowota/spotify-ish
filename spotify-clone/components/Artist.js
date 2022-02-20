

export default function Artist({artist}) {
  return (
    <div className="flex-none w-48 h-62  bg-gray-800 rounded-lg hover:bg-slate-700 cursor-pointer">
        <div className='flex flex-col items-center space-y-3  mt-2' >
            <img src={artist?.image} className='self-center flex-1 rounded-full w-[150px] h-[80px] object-contain'/>
            <div className="flex flex-col mx-3 ">
                <h2 className='text-white'>{artist.name}</h2>
            </div>
        </div>
    </div>
  )
}

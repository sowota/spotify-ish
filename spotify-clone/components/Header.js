import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from 'next-auth/react';
import {BsFillEmojiSmileFill} from 'react-icons/bs'

export default function Header() {

    const {data:session} = useSession
    
  return (
    <div>
        <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black rounded-full space-x-3 opacity-90 hover:opacity-80 cursor-pointer p-1 pr-3 pl-3">
                    <h2>{session?.user.name}</h2>
                    {session?
                    <img 
                    className="w-10 h-10 rounded-full"
                    src={session?.user.image}
                    />
                    :
                    <BsFillEmojiSmileFill style={{fontSize: '1.5rem', margin: '.5rem'}} />
                  }
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>
            </header>
    </div>
  )
}

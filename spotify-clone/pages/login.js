import { getProviders, signIn } from "next-auth/react"
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import Loading from "../components/Loader"

export default function Login({providers}) {

    const {data:session, status} = useSession()

    const router = useRouter()

    //console.log(session, status)

    useEffect(() =>{
        if(session){
            <Loading />
            router.push('/')
        }
    }, [session])

    

    //console.log(providers)

    
    return (
        <div className="flex flex-col items-center min-h-screen w-full overflow-hidden">
            <div className="flex gap-3 items-center justify-center mt-9 mb-8">
                <img  className="w-20" src="https://links.papareact.com/9xl"/>
                <h1 className="text-2xl">Spotify</h1>
            </div>
            <hr className="w-screen"/>
            {
                Object.values(providers).map(provider =>(
                    <div key={provider.id} className="flex justify-center mt-8">
                        <button className="bg-[#18D860] font-semibold text-lg p-3 rounded-full hover:bg-[#13b350]  w-[300px]" 
                        key={provider.name}
                        onClick={()=> signIn(provider.id, {callbackUrl:'/'})}
                        >
                            Login with {provider.name}
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export async function getServerSideProps(){
    const providers = await getProviders()

    return {
        props:{
            providers,
        }
    }
}

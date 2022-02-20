
import Sidebar from './../components/Sidebar';
import Center from './../components/Center';
import { useSession } from 'next-auth/react';
import Loader from '../components/Loader';
import { useRouter } from 'next/router';
export default function Home() {

  const router = useRouter()
  const {status, data:session} = useSession({
    onUnauthenticated(){
      router.push('/login')
    }
  })
   
  if(status === 'loading'){
    return <Loader />
  }
 //console.log(session)


  return (
    <div className='bg-black scrollbar-hide'>
      <main className=''>
        <Sidebar />
        <Center />
      </main>
    </div>
  )
}

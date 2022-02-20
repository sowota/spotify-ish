import { BallTriangle } from  'react-loader-spinner'

export default function Loading() {
  return <div className="bg-stone-800 w-screen h-screen flex justify-center items-center">
    <BallTriangle color="#13b350" height={80} width={80} />
  </div>;
}

import { Skeleton } from '@/ShadCn UI/skeleton';

export function RequestSkeleton() {
  let tempArray = ['a', 'b', 'c'];

  return (
      <div className="flex flex-col items-center gap-4 mt-2 w-screen">
          <h1 className='text-black font-semibold text-2xl text-center'>Requests</h1>
      {tempArray.map(() => (
        
          <div className="flex  mt-3 w-[500px]   max-[500px]:w-[320px]  px-3 py-2">
          <Skeleton className="avatar w-[80px] h-[80px] max-[500px]:w-[50px] max-[500px]:h-[43px]   rounded-full"></Skeleton>

          <div className=" ms-2 w-[200px] flex flex-col justify-center gap-2">
            <Skeleton className="w-[200px]  max-[500px]:w-[150px] h-[20px]" />
            <Skeleton className="w-[100px] max-[500px]:w-[70px]  h-[20px]" />
          </div>

        
            <div className="flex items-center gap-2 ms-2">
            <Skeleton className="w-[80px] h-[45px] max-[500px]:w-8 max-[500px]:h-8 max-[500px]:rounded-full"    />
            <Skeleton className="w-[80px] h-[45px] max-[500px]:w-8 max-[500px]:h-8 max-[500px]:rounded-full" />
             </div>   
        </div>
      ))}
    </div>
  );
}

import { Skeleton } from "@/ShadCn UI/skeleton"

export function UserCardSkeletion() {
  return (
    
    <div className="card mt-0 md:mt-3 rounded-2xl bg-base-100 h-[570px] w-[320px] md:h-[640px] md:w-[350px]">
          <Skeleton className="w-full h-[350px] md:h-[440px]"/>
          <div className="card-body flex flex-col gap-2">

              <Skeleton className="w-[285px] h-[60px] fw-bold" />
              <div className="flex gap-2">
              <Skeleton className="w-[70px] h-[40px]"/>
              <Skeleton className="w-[70px] h-[40px]"/>
              </div>
          
        
        
          
        </div>
      </div>
    )
    
}

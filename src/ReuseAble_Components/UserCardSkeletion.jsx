import { Skeleton } from "@/ShadCn UI/skeleton"

export function UserCardSkeletion() {
  return (
    
    <div className="card max-[800px]:mt-3 rounded-lg bg-base-100 h-[500px] w-[350px]">
          <Skeleton className="w-[350px] h-[440px]"/>
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

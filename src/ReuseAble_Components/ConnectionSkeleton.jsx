import { Skeleton } from "@/ShadCn UI/skeleton";


export function ConnectionSkeleton() {
  let tempArray = ['a','b','c','d']

  return (
    <div className="flex flex-col gap-2 mt-2">
   { tempArray.map(() =>
  (
<div className="flex items-center space-x-4 p-5">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
  ))}
    
    </div>
  )
}

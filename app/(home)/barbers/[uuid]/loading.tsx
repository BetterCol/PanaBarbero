import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container mx-auto p-2">
      <Skeleton className="mx-auto flex min-h-96 max-w-sm items-center justify-center p-4 sm:max-w-md md:max-w-xl md:p-8 lg:max-w-4xl" />
    </div>
  );
};
export default Loading;

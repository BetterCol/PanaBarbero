import { Skeleton } from "@/components/ui/skeleton";
import { Paragraph } from "@/components/ui/typography";

const Loading = () => {
  return (
    <div className="container mx-auto p-2">
      <Skeleton className="mb-2 h-12 w-96" />
      <Skeleton className="mb-6 h-4 w-72" />
      <div className="container mx-auto flex min-h-96 animate-pulse items-center justify-center rounded-xl bg-accent">
        <Paragraph muted>Cargando...</Paragraph>
      </div>
    </div>
  );
};
export default Loading;

import { Skeleton } from "@/components/ui/skeleton";
import { Paragraph } from "@/components/ui/typography";

const Loading = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <Skeleton className="mx-auto h-72 w-80" />
        <div className="flex min-h-96 w-full animate-pulse items-center justify-center rounded-xl bg-accent">
          <Paragraph muted center>
            Cargando...
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
export default Loading;

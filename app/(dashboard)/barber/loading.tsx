import { Skeleton } from "@/components/ui/skeleton";
import { Paragraph } from "@/components/ui/typography";

const Loading = () => {
  return (
    <div>
      <Skeleton className="mb-2 h-10 w-96" />
      <Skeleton className="mb-6 h-4 w-72" />
      <div className="flex min-h-96 w-full items-center justify-center rounded-xl bg-muted">
        <Paragraph muted center>
          Cargando...
        </Paragraph>
      </div>
    </div>
  );
};
export default Loading;

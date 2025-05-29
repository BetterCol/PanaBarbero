import { toast } from "sonner";

export function useClipboard() {
  const copyToClipboard = (text: string) => {
    toast.promise(
      async () => {
        return await navigator.clipboard.writeText(text);
      },
      {
        loading: "Copiando al portapapeles...",
        success: "Texto copiado al portapapeles",
        error: "Error al copiar al portapapeles",
      },
    );
  };

  return { copyToClipboard };
}

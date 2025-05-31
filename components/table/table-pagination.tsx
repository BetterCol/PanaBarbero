import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Paragraph } from "@/components/ui/typography";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 px-2 pt-4 md:flex-row md:items-center">
      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center">
        <div className="flex items-center space-x-2">
          <p className="font-medium text-sm">Mostrar</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 15, 20].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Paragraph muted>
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s)
        </Paragraph>
      </div>
      <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:justify-end">
        <div className="flex items-center gap-4">
          <Paragraph>
            Pagina {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </Paragraph>
          <div className="flex items-center space-x-2">
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="hidden lg:flex"
                  size="icon"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Ir a la primera pagina</span>
                  <ChevronsLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Paragraph>Ir a la primera pagina</Paragraph>
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Ir a la pagina anterior</span>
                  <ChevronLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Paragraph>Ir a la pagina anterior</Paragraph>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Ir a la pagina siguiente</span>
                  <ChevronRight />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Paragraph>Ir a la pagina siguiente</Paragraph>
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Ir a la ultima pagina</span>
                  <ChevronsRight />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Paragraph>Ir a la ultima pagina</Paragraph>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

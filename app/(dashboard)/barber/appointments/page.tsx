import { columns } from "@/components/barber/appointments/columns";
import { AppointmentsTable } from "@/components/barber/appointments/data-table";
import { data } from "@/components/barber/appointments/utils";
import { Card, CardContent } from "@/components/ui/card";
import { AppointmentsCardHeader, CalendarClient } from "./page.client";

const Appointments = () => {
  return (
    <div className="grid w-full grid-cols-1 place-items-start gap-4 px-2 md:grid-cols-3 md:gap-8 lg:grid-cols-5 xl:grid-cols-6 2xl:px-0">
      <CalendarClient />
      <Card className="col-span-1 mx-auto min-h-[18.4rem] w-full md:col-span-2 lg:col-span-4 lg:max-w-[42rem] xl:col-span-5 xl:max-w-4xl 2xl:max-w-full">
        <AppointmentsCardHeader />
        <CardContent>
          <AppointmentsTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
};
export default Appointments;

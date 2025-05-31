import { getBarbershopByUuid } from "@/database/services/barbershops/get";

type BarberParams = {
  uuid: string;
};

const Barber = async ({
  params,
}: {
  params: Promise<BarberParams>;
}) => {
  const { uuid } = await params;

  const barbershop = await getBarbershopByUuid(uuid);

  return (
    <div>
      <h1>Barber Profile</h1>
      <h2>Barbershop {barbershop?.address}</h2>
      <p>UUID: {uuid}</p>
    </div>
  );
};
export default Barber;

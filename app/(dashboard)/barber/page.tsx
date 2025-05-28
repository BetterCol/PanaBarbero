import { HeaderAnalytics } from "@/components/barber/header-analytics";
import { Heading, Paragraph } from "@/components/ui/typography";

const BarberDashboard = () => {
  return (
    <div className="px-4 2xl:px-0">
      <div className="mb-6">
        <Heading>Bienvenido de vuelta</Heading>
        <Paragraph muted>
          Aquí puedes ver las estadísticas de tus reservaciones y administrar tu agenda.
        </Paragraph>
      </div>

      <HeaderAnalytics />
    </div>
  );
};
export default BarberDashboard;

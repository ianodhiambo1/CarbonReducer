import EnergyMetrics from "../../components/energy/EnergyMetrics";
import PowerTrendChart from "../../components/energy/PowerTrendChart";
import ApplianceUsageChart from "../../components/energy/ApplianceUsageChart";
import CarbonTargetChart from "../../components/energy/CarbonTargetChart";
import EnergyLogsTable from "../../components/energy/EnergyLogsTable";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Smart Home Energy Dashboard | TailAdmin"
        description="Dashboard for Optimising Carbon Footprint in Smart Homes using Machine Learning"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EnergyMetrics />
          <PowerTrendChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <CarbonTargetChart />
        </div>

        <div className="col-span-12">
          <ApplianceUsageChart />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <EnergyLogsTable />
        </div>
      </div>
    </>
  );
}

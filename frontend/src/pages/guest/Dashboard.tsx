import Navbar from '../../components/Navbar';
import LineChart from '../../components/guest/LineChart';
import TopPackage from '../../components/guest/TopPackage';
import BottomPackage from '../../components/guest/BottomPackage';
import SearchData from '../../components/guest/SearchData';
import PengadaanRecap from '../../components/guest/PengadaanRecap';

export default function Dashboard() { 

  return (
    <div className="bg-white">
      <Navbar />      
      <SearchData/>
      <LineChart/>
      <TopPackage/>
      <BottomPackage/>
      <PengadaanRecap/>
    </div>
  );
};
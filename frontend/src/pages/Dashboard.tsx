import Navbar from '../components/Navbar';
import LineChart from '../components/LineChart';
import TopPackage from '../components/TopPackage';
import BottomPackage from '../components/BottomPackage';
import SearchData from '../components/SearchData';
import PengadaanRecap from '../components/PengadaanRecap';

export default function Dashboard() { 

  return (
    <div className="bg-white">
      <Navbar type='kabag'/>      
      <SearchData/>
      <LineChart/>
      <TopPackage/>
      <BottomPackage/>
      <PengadaanRecap/>
    </div>
  );
};
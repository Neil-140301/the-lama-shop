import './index.css';
import FeaturedInfo from '../../components/FeaturedInfo';
import Chart from '../../components/Chart';
import WidgetSm from '../../components/WidgetSm';
import WidgetLg from '../../components/WidgetLg';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../requestMethods';

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/users/stats');
        res.data.map((i) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[i._id - 1], 'Active User': i.total },
          ])
        );
      } catch (error) {}
    };

    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        title="User Analytics"
        data={userStats}
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

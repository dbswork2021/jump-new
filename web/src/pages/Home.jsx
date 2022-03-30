import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { HomeApi } from '../utils/api';
import { Link } from 'react-router-dom';

const { Column } = Table;

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    HomeApi().then((res) => {
      let newData = [];
      for (let agent in res.data) {
        newData.push({
          key: agent.split('-')[1],
          agent: agent.split('-')[0],
          count: res.data[agent],
          time: new Date().toLocaleDateString(),
        });
      }
      setData(newData);
    });
  }, []);
  return (
    <div>
      <Table dataSource={data}>
        <Column title="代理" dataIndex="agent" key="agent" />
        <Column
          title="访问次数"
          key="count"
          render={(_, record) => (
            <Link to={'/admin/stats/' + record.key}>{record.count}</Link>
          )}
        />
        <Column title="时间" dataIndex="time" key="time" />
      </Table>
      ,
    </div>
  );
};

export default Home;

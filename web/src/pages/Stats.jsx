import { Table, Row, Col, DatePicker } from 'antd';
import { Bar } from '@ant-design/charts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StatsApi } from '../utils/api';

const { Column } = Table;

const Stats = () => {
  const { id } = useParams();
  const [tableData, setTableData] = useState([]);
  const [chartsData, setChartsData] = useState([]);
  useEffect(() => {
    StatsApi({ id }).then((res) => {
      let newTable = [];
      res.data.tableData.forEach((element) => {
        newTable.push({
          ...element,
          key: element._id,
          agent: element.agent.name,
          createTime: new Date(element.createTime).toLocaleString(),
        });
      });
      setTableData(newTable);
      let newCharts = [];
      for (let city in res.data.chartsData) {
        newCharts.push({
          key: city,
          city: city,
          count: res.data.chartsData[city],
        });
      }
      setChartsData(newCharts);
    });
  }, []);

  const onChange = (value) => {
    const createTime = new Date(value._d).getTime();

    StatsApi({ id, createTime }).then((res) => {
      let newTable = [];
      res.data.tableData.forEach((element) => {
        newTable.push({
          ...element,
          key: element._id,
          agent: element.agent.name,
          createTime: new Date(element.createTime).toLocaleString(),
        });
      });
      setTableData(newTable);
      let newCharts = [];
      for (let city in res.data.chartsData) {
        newCharts.push({
          key: city,
          city: city,
          count: res.data.chartsData[city],
        });
      }
      setChartsData(newCharts);
    });
  };
  return (
    <div>
      <Row>
        <Col span={8}>统计图</Col>
        <Col span={8} offset={8}>
          <DatePicker onChange={onChange} />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Bar
            data={chartsData}
            xField={'count'}
            yField={'city'}
            scrollbar={{
              type: 'vertical',
            }}
            style={{ height: '100%' }}
          />
        </Col>
        <Col span={12}>
          <Table dataSource={tableData}>
            <Column title="代理" key="agent" dataIndex="agent" />
            <Column title="地区" key="city" dataIndex="city" />
            <Column title="系统" key="system" dataIndex="system" />
            <Column title="浏览器" key="broser" dataIndex="broser" />
            <Column title="时间" key="createTime" dataIndex="createTime" />
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;

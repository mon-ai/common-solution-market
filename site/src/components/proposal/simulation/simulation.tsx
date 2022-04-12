import styles from './simulation.less';
import { Card, Space, Button } from 'antd';

import { ISimulation } from '../proposal';

export function Simulation(props: ISimulation) {
  return (
    <Card type="inner" title={props.title}
    extra={<a>View source details</a>}>
      <p>{props.description}</p>
      <Space size={8}>
        <Button type="primary">Playtest</Button>
        <Button>Accept</Button>
        <Button>Reject</Button>
      </Space>
    </Card>
  );
}

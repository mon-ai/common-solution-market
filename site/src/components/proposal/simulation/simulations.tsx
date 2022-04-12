import styles from './simulations.less';
import { Button, Space } from 'antd';

import { ISimulation } from '../proposal';
import { Simulation } from './simulation';

interface ISimulations {
  simulations: ISimulation[];
}

export function Simulations(props: ISimulations) {
  return (
    <div>
      <h2>Simulations</h2>
      <Space size={8} align='start' wrap={true}>
          {props.simulations
            ? props.simulations.map((change: ISimulation) => <Simulation id={change.id} title={change.title} description={change.description}/>)
            : ''}
      </Space>
      <Button type="primary" style={{marginTop: 16}}>Submit New Simulation</Button>
    </div>
  );
}

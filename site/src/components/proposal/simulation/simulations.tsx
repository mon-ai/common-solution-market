import styles from './simulations.less';
import { Button, Space, Alert } from 'antd';

import { ISimulation } from '../proposal';
import { Simulation } from './simulation';

interface ISimulations {
  simulations: ISimulation[];
}

export function Simulations(props: ISimulations) {
  return (
    <div>
      <h2>Simulations</h2>
      <Space size={16} direction="vertical">
        <Space size={8} align="start" wrap={true}>
          {props.simulations.length > 0 ? (
            props.simulations.map((change: ISimulation) => (
              <Simulation
                id={change.id}
                title={change.title}
                description={change.description}
              />
            ))
          ) : (
            <Alert message="No submitted simulations" type="error" />
          )}
        </Space>
        <Button type="primary">Submit New Simulation</Button>
      </Space>
    </div>
  );
}

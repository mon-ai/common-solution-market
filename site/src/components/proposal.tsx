import styles from './proposal.less';

import { Button, Card, Space } from 'antd';
import { useState } from 'react';

export interface IProposal {
  id: number;
  title: string;
  description: string;
  funding: number;
  funders: number;
}

const tabList = [
  { key: 'general', tab: 'General' },
  { key: 'governance', tab: 'Governance' },
  { key: 'simulation', tab: 'Simulation' },
];

export function Proposal(props: IProposal) {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className={styles.card}>
      <Card
        title={props.title}
        tabList={tabList}
        extra={
          <p>
            <strong>{props.funding} ETH</strong> from&nbsp;
            <a><strong>{props.funders} funders</strong></a>
          </p>
        }
      >
        <h2>Description</h2>
        <p>{props.description}</p>
        <Button type='primary'>Fund this Proposal</Button>
      </Card>
    </div>
  );
}

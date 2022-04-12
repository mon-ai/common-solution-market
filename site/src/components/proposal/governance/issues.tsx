import styles from './issues.less';
import { Button, Divider, Space } from 'antd';

import { IIssues, IMerger, IChange } from '../proposal';
import { Change } from './change';
import { Merger } from './merger';

export function Issues(props: IIssues) {
  return (
    <div>
      <h2>Mergers</h2>
      <Space size={8} align='start' wrap={true}>
          {props.mergers
            ? props.mergers.map((merger: IMerger) => <Merger id={merger.id} title={merger.title} description={merger.description}/>)
            : ''}
      <Button type="primary" style={{marginTop: 8}}>Suggest New Merger</Button>
      </Space>
      <Divider />
      <h2>Criterion Changes</h2>
      <Space size={8} align='start' wrap={true}>
          {props.changes
            ? props.changes.map((change: IChange) => <Change id={change.id} title={change.title} description={change.description}/>)
            : ''}
      </Space>
      <Button type="primary" style={{marginTop: 16}}>Suggest New Change</Button>
    </div>
  );
}

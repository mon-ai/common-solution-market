import styles from './merger.less';
import { Card, Space, Button } from 'antd';

import { IMerger } from '../proposal';

export function Merger(props: IMerger) {
  return (
    <Card type="inner" title={props.title} extra={<a>View full proposal</a>}>
      <p>{props.description}</p>
      <Space size={8}>
        <Button>Merge</Button>
        <Button>Don't Merge</Button>
      </Space>
    </Card>
  );
}

import styles from './change.less';

import { Card, Space, Button } from 'antd';
import { IChange } from '../proposal';

export function Change(props: IChange) {
  return (
    <Card type="inner" title={props.title} extra={<a>View full commit</a>}>
      <p>{props.description}</p>
      <Space size={8}>
        <Button>Vote Yes</Button>
        <Button>Vote No</Button>
      </Space>
    </Card>
  );
}

import { Card } from 'antd'
import { IChange } from '../proposal';
import styles from './change.less';

export function Change(props: IChange) {
  return (
    <Card type="inner" title={props.title}>
      <p>{props.description}</p>
    </Card>
  );
}

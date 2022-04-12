import styles from './merger.less';
import { Card } from 'antd';

import { IMerger } from '../proposal';

export function Merger(props: IMerger) {
  return (
    <Card type="inner" title={props.title}>
      <p>{props.description}</p>
    </Card>
  );
}

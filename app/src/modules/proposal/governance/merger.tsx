import { Button, Card, Space } from "antd";
import { IMerger } from "../../../common/types/proposals";

export default function Merger(props: IMerger) {
  return (
    <Card type="inner" title={props.title} extra={<a>View full proposal</a>}>
      <p>{props.description}</p>
      <Space size={8}>
        <Button>Merge</Button>
        <Button>Don&apos;t Merge</Button>
      </Space>
    </Card>
  );
}

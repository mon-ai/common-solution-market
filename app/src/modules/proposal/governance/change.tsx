import { Button, Card, Space } from "antd";
import { IChange } from "../../../common/types/proposals";

export default function Change(props: IChange) {
  return (
    <Card type="inner" title={props.title} extra={<a>View full commit</a>}>
      <p>{props.description}</p>
      <Space size={8}>
        <Button>Yes</Button>
        <Button>No</Button>
      </Space>
    </Card>
  );
}

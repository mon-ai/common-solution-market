import { Button, Input, InputNumber, Modal, Space, Steps } from "antd";
import { useState } from "react";
import MDEditor from "../../common/components/markdownEditor";
const { Step } = Steps;
import NumberFormat from "react-number-format";

interface NewProposalProps {
  visible: boolean;
  close: () => void;
}

interface contentProps {
  name: string;
  setName: (name: string) => void;
  description: string | undefined;
  setDescription: (description: string | undefined) => void;
  funding: number;
  setFunding: (funding: number) => void;
}

function contentFor(step: number, props: contentProps) {
  switch (step) {
    case 0:
      return (
        <div>
          <Input
            placeholder="Enter a short name for your proposal"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
          />
        </div>
      );
    case 1:
      return (
        <div data-color-mode="light">
          <div className="wmde-markdown-var"> </div>
          <MDEditor value={props.description} onChange={props.setDescription} />
        </div>
      );
    case 2:
      return (
        <div>
          <Space direction="vertical">
            <Space>
              <Button onClick={() => props.setFunding(10)}>$10</Button>
              <Button onClick={() => props.setFunding(100)}>$100</Button>
              <Button onClick={() => props.setFunding(1000)}>$1000</Button>
              <Button onClick={() => props.setFunding(10000)}>$10000</Button>
            
            </Space>
            <InputNumber
                value={props.funding}
                onChange={(e) => props.setFunding(e)}
                className="w-full"
                prefix="$"
              />
          </Space>
        </div>
      );
    default:
      <div></div>;
  }
}

export default function NewProposal(props: NewProposalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState<string | undefined>("");
  const [funding, setFunding] = useState(100);

  const [step, setStep] = useState(0);

  return (
    //@ts-ignore
    <Modal
      className="w-3/4"
      title="New Proposal"
      visible={props.visible}
      onCancel={props.close}
      footer={
        <div>
          <Button
            type="link"
            onClick={() => {
              setStep(0);
              setName("");
              setDescription("");
              setFunding(10);
              props.close();
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => setStep(Math.max(0, step - 1))}>Back</Button>
          <Button type="primary" onClick={() => setStep(Math.min(2, step + 1))}>
            Next
          </Button>
        </div>
      }
    >
      <Space className="w-full" size={16} direction="vertical">
        {/*
         // @ts-ignore */}
        <Steps current={step} size="small">
          <Step title="Propose" />
          <Step title="Describe" />
          <Step title="Fund" />
        </Steps>
        {contentFor(step, {
          name,
          setName,
          description,
          setDescription,
          funding,
          setFunding,
        })}
      </Space>
    </Modal>
  );
}

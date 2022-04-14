import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, Space } from 'antd';

export default function CustomButton() {
  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
        }) =>
          !account ? (
            <Button
              onClick={openConnectModal}
              type="primary"
              className="shadow-ant-dark"
            >
              Connect Wallet
            </Button>
          ) : (
            <Space size={16}>
              {chain && (
                <Button
                  onClick={openChainModal}
                  className="shadow-ant-dark"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {chain.iconUrl && (
                    <img
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl}
                      style={{ width: 12, height: 12, marginRight: 4 }}
                    />
                  )}
                  {chain.name ?? chain.id}
                  {chain.unsupported && ' (unsupported)'}
                </Button>
              )}
              <Button
                onClick={openAccountModal}
                className="shadow-ant-dark"
              >
                {account.displayName}
                {account.displayBalance ? ` (${account.displayBalance})` : ''}
              </Button>
            </Space>
          )
        }
      </ConnectButton.Custom>
    </>
  );
};

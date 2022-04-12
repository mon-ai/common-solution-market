import styles from './connect-button.less';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, Space } from 'antd';

export const CustomButton = () => {
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
              className={styles.button_primary}
            >
              Connect Wallet
            </Button>
          ) : (
            <Space size={16}>
              {chain && (
                <Button
                  onClick={openChainModal}
                  className={styles.button_default}
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
                className={styles.button_default}
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

import React from 'react';
import { useRouter } from 'src/routes/hooks';

// mui imports
import { Box, Button, IconButton } from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import { useWallet } from 'src/contexts/WalletContext';

import { closeSnackbar, useSnackbar } from 'notistack';

function ConnectButton() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { connectMetaMask, metaMaskData } = useWallet();
  const { isMetaMaskConnected } = metaMaskData;

  const connectWallet = () => {
    connectMetaMask();
    enqueueSnackbar('Wallet Connected Successfully', {
      variant: 'success',
      autoHideDuration: 2000,
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} size="small" color="inherit">
          <CloseIcon />
        </IconButton>
      ),
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });
    router.push('/');
  };

  // if (isMetaMaskConnected)

  return (
    <Button variant="contained" onClick={connectWallet}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
        alt=""
        style={{
          width: 48,
          height: 48,
          marginRight: 10,
        }}
      />
      Connect to MetaMask
    </Button>
  );
}

export default function ConnectWalletView() {
  const router = useRouter();
  const { metaMaskData } = useWallet();

  const { isMetaMaskConnected } = metaMaskData;

  if (isMetaMaskConnected) router.push('/');

  return (
    <Box>
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <ConnectButton />
        {/* {router.push('/')} */}
      </div>
    </Box>
  );
}
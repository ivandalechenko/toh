

import { WalletProvider } from '@solana/wallet-adapter-react';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import Swapper from './Swapper';
import '@solana/wallet-adapter-react-ui/styles.css';

export default () => {
    const wallets = [new PhantomWalletAdapter()];
    return (
        <div className="hero container_mini">
            <div className="hero_top">
                <div className="hero_header">
                    TEDDY ON HEELS PAWS TO THE MOON
                </div>
                <div className="hero_subheader">
                    BUY <span>$TOH</span> - SCALE - FUN WITH TEDDY
                </div>
            </div>
            <div className="hero_content">
                <div className="hero_decor">
                    <div className="hero_light free_img">
                        <img src='/img/light.svg' alt='decor' />
                    </div>
                    <div className="hero_dog free_img">
                        <img src='/img/dog.png' alt='decor' />
                    </div>
                </div>
                {/* <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
        <WalletProvider wallets={wallets} autoConnect>
          <Swapper />
        </WalletProvider>
      </ConnectionProvider> */}
            </div>
        </div>
    )
}
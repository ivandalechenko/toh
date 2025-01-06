import { observer } from "mobx-react-lite";
import Dex from "./Dex";
import { walletStore } from "./walletStore";

export default observer(() => {
    return (
        <div className="header container">
            <div className="header_logo">
                <img src="/img/logo.png" alt="" />
            </div>
            <div className="header_links">
                <a href="#about" className="header_links_element">ABOUT</a>
                <a href="#roadmap" className="header_links_element">ROADMAP</a>
                <a href="#tokenomics" className="header_links_element">TOKENOMICS</a>
                <a href="#faq" className="header_links_element">FAQ</a>
            </div>
            <div className="header_media">
                <Dex />
                <button className="header_connect" onClick={
                    () => {
                        walletStore.walletConnected
                            ? walletStore.disconnectWallet()
                            : walletStore.connectWallet()
                    }
                }>
                    {
                        walletStore.walletConnected ? `${walletStore.publicKey.slice(0, 4)}...${walletStore.publicKey.slice(-4)}` : ' CONNECT WALLET'
                    }
                </button>
            </div>
        </div>
    )
})
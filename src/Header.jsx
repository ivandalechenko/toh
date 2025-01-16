import { observer } from "mobx-react-lite";
import Dex from "./Dex";
import { walletStore } from "./walletStore";
import ReactGA from "react-ga4";

export default observer(() => {

    const buy = () => {

        ReactGA.gtag("event", "purchase", {
            value: 0.00,
            currency: "SOL"
        });



        // fbq('track', 'Purchase', { value: 0.00, currency: 'SOL' });
        window.location.href = "https://raydium.io/swap/?inputMint=sol&outputMint=C1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB";
    }

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
                <button className="header_connect" onClick={buy}>
                    BUY NOW
                    {/* {
                        walletStore.walletConnected ? `${walletStore.publicKey?.slice(0, 4)}...${walletStore.publicKey?.slice(-4)}` : ' CONNECT WALLET'
                    } */}
                </button>
            </div>
        </div>
    )
})
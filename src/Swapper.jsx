import { useState, useEffect } from "react";
import { Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { Buffer } from "buffer"; // Import Buffer explicitly
import { walletStore } from "./walletStore"; // Подключение walletStore
import { observer } from "mobx-react-lite";
// import ReactGA from "react-ga4";

window.Buffer = Buffer;


export default observer(function Swapper() {
    const [solCount, setSolCount] = useState("");
    const [tohCount, setTohCount] = useState("");
    const [isSwapDirDefault, setSwapDirDefault] = useState(true);
    // const connection = new Connection(walletStore.DEVNET_URL);


    // const handleSwap = async () => {
    //     if (!walletStore.walletConnected || !walletStore.publicKey) {
    //         toast.warning("Please connect your wallet first.");
    //         return;
    //     }

    //     try {
    //         const solCountLamports = parseFloat(solCount) * 1e9;
    //         if (isNaN(solCountLamports) || solCountLamports <= 0) {
    //             toast.warning("Enter a valid SOL amount.");
    //             return;
    //         }

    //         const queryParams = new URLSearchParams({
    //             inputMint: walletStore.inputMint,
    //             outputMint: walletStore.outputMint,
    //             amount: solCountLamports.toString(),
    //             slippageBps: "50",
    //         }).toString();

    //         const quoteResponse = await fetch(`https://quote-api.jup.ag/v6/quote?${queryParams}`, {
    //             method: "GET",
    //             headers: { "Content-Type": "application/json" },
    //         });

    //         const quoteData = await quoteResponse.json();
    //         const { routePlan } = quoteData;

    //         if (!routePlan || routePlan.length === 0 || !routePlan[0]?.swapInfo) {
    //             toast.warning("No valid route found for the swap.");
    //             return;
    //         }

    //         const swapResponse = await fetch("https://quote-api.jup.ag/v6/swap", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 quoteResponse: quoteData,
    //                 userPublicKey: walletStore.publicKey,
    //                 wrapAndUnwrapSOL: true,
    //             }),
    //         });

    //         const { swapTransaction } = await swapResponse.json();
    //         const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
    //         const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

    //         const provider = await walletStore.getProvider();

    //         const signedTransaction = await provider.signTransaction(transaction);

    //         const latestBlockHash = await connection.getLatestBlockhash();
    //         const rawTransaction = signedTransaction.serialize();

    //         const txid = await connection.sendRawTransaction(rawTransaction, {
    //             skipPreflight: true,
    //             maxRetries: 2,
    //         });
    //         await connection.confirmTransaction({
    //             blockhash: latestBlockHash.blockhash,
    //             lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    //             signature: txid,
    //         });

    //         console.log(`Transaction successful: https://solscan.io/tx/${txid}`);

    //     } catch (err) {
    //         console.error("Error during swap:", err);
    //     }
    // };


    const handleSwap = async () => {

        // ReactGA.gtag("event", "purchase", {
        //     value: +solCount,
        //     currency: "SOL"
        // });


        // gtag("event", "purchase", {
        //     value: +solCount,
        //     currency: "SOL"
        // });
        // fbq('track', 'Purchase', { value: +solCount, currency: 'SOL' });
        window.location.href = "https://raydium.io/swap/?inputMint=sol&outputMint=C1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB";
    }

    const swapInputOutput = () => {
        const oldStatus = isSwapDirDefault;
        walletStore.setSwapDir(!oldStatus)
        setSwapDirDefault(!oldStatus)

    }

    const updateTopCount = (count) => {
        const countToSet = filterValue(count)
        updateValues(countToSet, true)
    };

    const updateBotCount = (count) => {
        const countToSet = filterValue(count)
        updateValues(countToSet, false)
    }

    const filterValue = (count) => {
        let number = count.replace(/[^0-9.]/g, "");
        if ((number.match(/\./g) || []).length > 1) {
            return; // Если больше одной точки, ничего не делаем
        }
        let countToSet = number === "." ? "0." : number;

        if (countToSet.length === 0) {
            countToSet = '0'
        }
        if (countToSet.length === 2) {
            if (countToSet[0] === '0' && countToSet[1] !== '.') {
                countToSet = countToSet.slice(1)
            }
        }
        return countToSet
    }

    const updateValues = (countToSet, reverse = false) => {
        if (reverse) {
            setSolCount(countToSet);
            if (!isNaN(parseFloat(countToSet))) {
                setTohCount(parseFloat(countToSet) * (1 / walletStore.solPerToh));
            }
        } else {
            setTohCount(countToSet);
            if (!isNaN(parseFloat(countToSet))) {
                setSolCount(parseFloat(countToSet) * walletStore.solPerToh);
            }
        }
    }

    return (
        <div className="hero_swapper">
            <div className="hero_swapper_header">BUY TOH</div>

            <div className="hero_swapper_curr">
                {
                    isSwapDirDefault ? <div className="hero_swapper_curr_name">
                        <div className="hero_swapper_curr_name_logo">
                            <img src="/img/solana.svg" alt="Solana logo" />
                        </div>
                        <div className="hero_swapper_curr_name_text">Solana</div>
                    </div> :
                        <div className="hero_swapper_curr_name">
                            <div className="hero_swapper_curr_name_logo">
                                <img src="/img/logo.png" alt="TOH logo" />
                            </div>
                            <div className="hero_swapper_curr_name_text">TOH</div>
                        </div>
                }

                <input
                    type="text"
                    value={isSwapDirDefault ? solCount : tohCount}
                    onChange={(e) => {
                        isSwapDirDefault
                            ? updateTopCount(e.target.value)
                            : updateBotCount(e.target.value)
                    }}
                    placeholder="0.00"
                />
            </div>

            <div className="hero_swapper_swapBtn_wrapper free_img">
                <div className="hero_swapper_swapBtn" onClick={swapInputOutput} >
                    <img src="/img/doubleArrow.svg" alt="Swap" />
                </div>
            </div>

            <div className="hero_swapper_curr">
                {
                    !isSwapDirDefault ? <div className="hero_swapper_curr_name">
                        <div className="hero_swapper_curr_name_logo">
                            <img src="/img/solana.svg" alt="Solana logo" />
                        </div>
                        <div className="hero_swapper_curr_name_text">Solana</div>
                    </div> :
                        <div className="hero_swapper_curr_name">
                            <div className="hero_swapper_curr_name_logo">
                                <img src="/img/logo.png" alt="TOH logo" />
                            </div>
                            <div className="hero_swapper_curr_name_text">TOH</div>
                        </div>
                }
                <input
                    type="text"
                    value={!isSwapDirDefault ? solCount : tohCount}
                    onChange={(e) => {
                        !isSwapDirDefault
                            ? updateTopCount(e.target.value)
                            : updateBotCount(e.target.value)
                    }}
                    placeholder="0.00"
                />
            </div>


            {/* {
                walletStore.walletConnected ? <div
                    className="hero_swapper_connectBtn"
                    onClick={handleSwap}
                >
                    SWAP
                </div> : <div
                    className="hero_swapper_connectBtn"
                    onClick={walletStore.connectWallet}
                >
                    CONNECT WALLET
                </div>
            } */}
            <div
                className="hero_swapper_connectBtn"
                onClick={handleSwap}
            >
                BUY NOW
            </div>
            <div className='hero_swapper_trust'>
                Powered by Raydium Protocol
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" data-sentry-element="svg" data-sentry-source-file="RaydiumLogo.tsx" data-sentry-component="RaydiumLogo"><path d="M34.3297 15.8661V28.7492L20 37.021L5.66234 28.7492V12.1978L20 3.91808L31.013 10.2797L32.6753 9.32068L20 2L4 11.2388V29.7083L20 38.947L36 29.7083V14.9071L34.3297 15.8661Z" fill="url(#a)" data-sentry-element="path" data-sentry-source-file="RaydiumLogo.tsx"></path><path d="M15.988 28.7572H13.5904V20.7173H21.5824C22.3385 20.7089 23.061 20.4031 23.5934 19.8662C24.1259 19.3293 24.4255 18.6043 24.4276 17.8481C24.4319 17.4742 24.3597 17.1034 24.2154 16.7584C24.0711 16.4134 23.8577 16.1016 23.5884 15.8421C23.3278 15.5743 23.0158 15.362 22.6711 15.2178C22.3264 15.0736 21.9561 15.0005 21.5824 15.003H13.5904V12.5574H21.5904C22.991 12.5658 24.3319 13.1259 25.3222 14.1163C26.3126 15.1067 26.8727 16.4475 26.8811 17.8481C26.8897 18.9202 26.5627 19.9681 25.9461 20.8451C25.3785 21.6842 24.5786 22.3397 23.6444 22.7313C22.7193 23.0246 21.7537 23.1703 20.7832 23.1628H15.988V28.7572Z" fill="url(#b)" data-sentry-element="path" data-sentry-source-file="RaydiumLogo.tsx"></path><path d="M26.8252 28.5574H24.028L21.8701 24.7932C22.7238 24.741 23.5659 24.5688 24.3716 24.2817L26.8252 28.5574Z" fill="url(#c)" data-sentry-element="path" data-sentry-source-file="RaydiumLogo.tsx"></path><path d="M32.6593 13.1888L34.3137 14.1079L35.968 13.1888V11.2467L34.3137 10.2877L32.6593 11.2467V13.1888Z" fill="url(#d)" data-sentry-element="path" data-sentry-source-file="RaydiumLogo.tsx"></path><defs data-sentry-element="defs" data-sentry-source-file="RaydiumLogo.tsx"><linearGradient id="a" x1="35.9717" y1="11.2489" x2="2.04291" y2="24.817" gradientUnits="userSpaceOnUse" data-sentry-element="linearGradient" data-sentry-source-file="RaydiumLogo.tsx"><stop stop-color="#C200FB" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop><stop offset="0.489658" stop-color="#3772FF" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop><stop offset="1" stop-color="#5AC4BE" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop></linearGradient><linearGradient id="b" x1="35.9717" y1="11.2489" x2="2.04291" y2="24.817" gradientUnits="userSpaceOnUse" data-sentry-element="linearGradient" data-sentry-source-file="RaydiumLogo.tsx"><stop stop-color="#C200FB" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop><stop offset="0.489658" stop-color="#3772FF" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop><stop offset="1" stop-color="#5AC4BE" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop></linearGradient><linearGradient id="c" x1="35.9717" y1="11.2489" x2="2.04291" y2="24.817" gradientUnits="userSpaceOnUse" data-sentry-element="linearGradient" data-sentry-source-file="RaydiumLogo.tsx"><stop stop-color="#C200FB" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop><stop offset="0.489658" stop-color="#3772FF" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop><stop offset="1" stop-color="#5AC4BE" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop></linearGradient><linearGradient id="d" x1="35.9717" y1="11.2489" x2="2.04291" y2="24.817" gradientUnits="userSpaceOnUse" data-sentry-element="linearGradient" data-sentry-source-file="RaydiumLogo.tsx"><stop stop-color="#C200FB" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop><stop offset="0.489658" stop-color="#3772FF" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop><stop offset="1" stop-color="#5AC4BE" data-sentry-element="stop" data-sentry-source-file="RaydiumLogo.tsx"></stop></linearGradient></defs></svg>
            </div>

            {/* gtag("event", "purchase", {
                value: +solCount,
            currency: "SOL"
        });
            fbq('track', 'Purchase', {value: +solCount, currency: 'SOL' });
            window.location.href = "https://raydium.io/swap/?inputMint=sol&outputMint=C1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB"; */}

        </div>
    );
})
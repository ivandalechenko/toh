import { useState, useEffect } from "react";
import { Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { Buffer } from "buffer"; // Import Buffer explicitly
import { walletStore } from "./walletStore"; // Подключение walletStore
import { observer } from "mobx-react-lite";

let DEVNET_URL = "https://sly-indulgent-wave.solana-mainnet.quiknode.pro/7738767fc1e78d5157e8c6fa4450d9abe43d5127";
window.Buffer = Buffer;


export default observer(function Swapper() {
    const [solCount, setSolCount] = useState("");
    const [tohCount, setTohCount] = useState("");
    const [isSwapDirDefault, setSwapDirDefault] = useState(true);
    const connection = new Connection(DEVNET_URL);

    useEffect(() => {
        walletStore.checkWallet();
    }, []);



    const handleSwap = async () => {
        if (!walletStore.walletConnected || !walletStore.publicKey) {
            toast.warning("Please connect your wallet first.");
            return;
        }

        try {
            const solCountLamports = parseFloat(solCount) * 1e9;
            if (isNaN(solCountLamports) || solCountLamports <= 0) {
                toast.warning("Enter a valid SOL amount.");
                return;
            }

            const queryParams = new URLSearchParams({
                inputMint: walletStore.inputMint,
                outputMint: walletStore.outputMint,
                amount: solCountLamports.toString(),
                slippageBps: "50",
            }).toString();

            const quoteResponse = await fetch(`https://quote-api.jup.ag/v6/quote?${queryParams}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const quoteData = await quoteResponse.json();
            const { routePlan } = quoteData;

            if (!routePlan || routePlan.length === 0 || !routePlan[0]?.swapInfo) {
                toast.warning("No valid route found for the swap.");
                return;
            }

            const swapResponse = await fetch("https://quote-api.jup.ag/v6/swap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    quoteResponse: quoteData,
                    userPublicKey: walletStore.publicKey,
                    wrapAndUnwrapSOL: true,
                }),
            });

            const { swapTransaction } = await swapResponse.json();
            const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
            const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

            const provider = walletStore.getProvider();
            const signedTransaction = await provider.signTransaction(transaction);

            const latestBlockHash = await connection.getLatestBlockhash();
            const rawTransaction = signedTransaction.serialize();

            const txid = await connection.sendRawTransaction(rawTransaction, {
                skipPreflight: true,
                maxRetries: 2,
            });
            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: txid,
            });

            console.log(`Transaction successful: https://solscan.io/tx/${txid}`);
        } catch (err) {
            console.error("Error during swap:", err);
        }
    };



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


            {
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
            }

        </div>
    );
})
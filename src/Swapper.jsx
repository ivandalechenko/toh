import { useState, useEffect } from "react";
import { Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { Buffer } from "buffer"; // Import Buffer explicitly

let DEVNET_URL = "https://sly-indulgent-wave.solana-mainnet.quiknode.pro/7738767fc1e78d5157e8c6fa4450d9abe43d5127";
window.Buffer = Buffer;



export default function Swapper() {
    const [solCount, setSolCount] = useState("");
    const [tohCount, setTohCount] = useState("");
    const [walletConnected, setWalletConnected] = useState(false);
    const [publicKey, setPublicKey] = useState(null);
    const connection = new Connection(DEVNET_URL);

    const TOH_MINT_ADDRESS = "C1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB"; // Replace with actual mint address

    const getProvider = () => {
        if ("phantom" in window) {
            const provider = window.phantom?.solana;
            if (provider?.isPhantom) {
                return provider;
            }
        }
        window.open("https://phantom.app/", "_blank");
    };

    useEffect(() => {
        const checkWallet = async () => {
            const provider = getProvider();
            if (provider) {
                try {
                    const resp = await provider.connect({ onlyIfTrusted: true });
                    setWalletConnected(true);
                    setPublicKey(resp.publicKey.toString());
                } catch (err) {
                    console.error("Error connecting to wallet:", err);
                }
            }
        };
        checkWallet();
    }, []);

    const handleConnectWallet = async () => {
        const provider = getProvider();
        if (!provider) return;

        try {
            const resp = await provider.connect();
            setWalletConnected(true);
            setPublicKey(resp.publicKey.toString());
            alert("Wallet connected: " + resp.publicKey.toString());
        } catch (err) {
            console.error("Wallet connection failed:", err);
            alert("Failed to connect wallet.");
        }
    };

    const handleSwap = async () => {
        console.log("Attempting to swap...");

        if (!walletConnected || !publicKey) {
            alert("Please connect your wallet first.");
            return;
        }

        try {
            const solCountLamports = parseFloat(solCount) * 1e9;
            if (isNaN(solCountLamports) || solCountLamports <= 0) {
                alert("Enter a valid SOL amount.");
                return;
            }

            // Получение котировки
            const queryParams = new URLSearchParams({
                inputMint: "So11111111111111111111111111111111111111112",
                outputMint: TOH_MINT_ADDRESS,
                amount: solCountLamports.toString(),
                slippageBps: "50",
            }).toString();

            const quoteResponse = await fetch(`https://quote-api.jup.ag/v6/quote?${queryParams}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const quoteData = await quoteResponse.json();
            console.log("Quote Response:", quoteData);

            const { routePlan } = quoteData;
            if (!routePlan || routePlan.length === 0 || !routePlan[0]?.swapInfo) {
                alert("No valid route found for the swap.");
                return;
            }

            const swapResponse = await fetch("https://quote-api.jup.ag/v6/swap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    quoteResponse: quoteData,
                    userPublicKey: publicKey,
                    wrapAndUnwrapSOL: true,
                }),
            });

            const { swapTransaction } = await swapResponse.json();
            const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
            const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

            // Подписание транзакции с помощью Phantom
            const provider = getProvider();
            const signedTransaction = await provider.signTransaction(transaction);

            const latestBlockHash = await connection.getLatestBlockhash();

            // Отправка транзакции
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


    return (
        <div className="hero_swapper">
            <div className="hero_swapper_header">BUY TOH</div>

            <div className="hero_swapper_curr">
                <div className="hero_swapper_curr_name">
                    <div className="hero_swapper_curr_name_logo">
                        <img src="/img/solana.svg" alt="Solana logo" />
                    </div>
                    <div className="hero_swapper_curr_name_text">Solana</div>
                </div>
                <input
                    type="number"
                    value={solCount}
                    onChange={(e) => setSolCount(e.target.value)}
                    placeholder="0.00"
                />
            </div>

            <div className="hero_swapper_swapBtn_wrapper free_img">
                <div className="hero_swapper_swapBtn" onClick={handleSwap}>
                    <img src="/img/doubleArrow.svg" alt="Swap" />
                </div>
            </div>

            <div className="hero_swapper_curr">
                <div className="hero_swapper_curr_name">
                    <div className="hero_swapper_curr_name_logo">
                        <img src="/img/logo.png" alt="TOH logo" />
                    </div>
                    <div className="hero_swapper_curr_name_text">TOH</div>
                </div>
                <input
                    type="number"
                    value={tohCount}
                    onChange={(e) => setTohCount(e.target.value)}
                    placeholder="0.00"
                    disabled
                />
            </div>

            <div
                className="hero_swapper_connectBtn"
                onClick={handleConnectWallet}
                style={{ cursor: "pointer" }}
            >
                {walletConnected ? "WALLET CONNECTED" : "CONNECT WALLET"}
            </div>
        </div>
    );
}

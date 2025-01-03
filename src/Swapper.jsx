import { useState, useEffect } from "react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Buffer } from "buffer"; // Import Buffer explicitly

window.Buffer = Buffer;

export default function Swapper() {
    const [solCount, setSolCount] = useState("");
    const [tohCount, setTohCount] = useState("");
    const [walletConnected, setWalletConnected] = useState(false);
    const [publicKey, setPublicKey] = useState(null);
    const connection = new Connection("https://api.mainnet-beta.solana.com");

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
        console.log('trytoswap');

        if (!walletConnected || !publicKey) {
            alert("Please connect your wallet first.");
            return;
        }

        try {
            const response = await fetch("https://quote-api.jup.ag/v4/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    inputMint: "So11111111111111111111111111111111111111112", // SOL mint address
                    outputMint: TOH_MINT_ADDRESS,
                    amount: parseFloat(solCount) * 1e9, // Convert SOL to lamports
                    slippageBps: 50, // Slippage 0.5%
                }),
            });

            const { routes } = await response.json();
            if (!routes || routes.length === 0) {
                alert("No route found for the swap.");
                return;
            }

            const bestRoute = routes[0];
            const transaction = Transaction.from(Buffer.from(bestRoute.txnBase64, "base64"));

            transaction.feePayer = new PublicKey(publicKey);
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

            const provider = getProvider();
            const signedTransaction = await provider.signTransaction(transaction);
            const txId = await connection.sendRawTransaction(signedTransaction.serialize());
            await connection.confirmTransaction(txId);

            alert("Swap completed successfully: " + txId);
        } catch (err) {
            console.error("Error during swap:", err);
            alert("Swap failed.");
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

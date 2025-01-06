import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

const sol = "So11111111111111111111111111111111111111112"
const toh = "C1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB"


class WalletStore {
    walletConnected = false;
    publicKey = '';

    inputMint = sol;
    outputMint = toh;
    solPerToh = 0.00000001;
    priceUsd = 0.00000001;
    mkap = 10000;



    constructor() {
        makeAutoObservable(this);
    }

    setSwapDir(status) {
        if (status) {
            this.inputMint = sol;
            this.outputMint = toh;
        } else {
            this.inputMint = toh;
            this.outputMint = sol;
        }
    }


    getProvider = () => {
        if ("phantom" in window) {
            const provider = window.phantom?.solana;
            if (provider?.isPhantom) {
                return provider;
            }
        }
        window.open("https://phantom.app/", "_blank");
    };

    connectWallet = async () => {
        const provider = this.getProvider();
        if (!provider) return;

        try {
            const resp = await provider.connect();
            this.walletConnected = true;
            this.publicKey = resp.publicKey.toString();
            toast.success("Wallet connected successfully.");
        } catch (err) {
            console.error("Wallet connection failed:", err);
            toast.warning("Failed to connect wallet.");
        }
    };

    disconnectWallet = async () => {
        const provider = this.getProvider();
        if (!provider) return;

        try {
            await provider.disconnect(); // Отключение от кошелька (если поддерживается провайдером)
            this.walletConnected = false;
            this.publicKey = null;
            toast.success("Wallet disconnected successfully.");
        } catch (err) {
            console.error("Failed to disconnect wallet:", err);
            toast.warning("Failed to disconnect wallet.");
        }
    };

    checkWallet = async () => {
        const provider = this.getProvider();
        if (provider) {
            try {
                const resp = await provider.connect({ onlyIfTrusted: true });
                this.walletConnected = true;
                this.publicKey = resp.publicKey.toString();
            } catch (err) {
                console.error("Error connecting to wallet:", err);
            }
        }
    };

    getCurr = async () => {
        const res = await fetch('https://api.dexscreener.com/latest/dex/tokens/C1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB')
        const data = await res.json();

        this.priceUsd = data.pairs[0].priceUsd;
        this.solPerToh = data.pairs[0].priceNative;
        this.mkap = data.pairs[0].marketCap;
    }




}

export const walletStore = new WalletStore();

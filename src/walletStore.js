import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { PhantomWalletAdapter, SolflareWalletAdapter, CoinbaseWalletAdapter, TrustWalletAdapter, LedgerWalletAdapter } from '@solana/wallet-adapter-wallets';
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
    selectedWallet = 'phantom';
    // selectedWallet = 'trust';
    // selectedWallet = 'solflare';
    // selectedWallet = 'coinbase';
    solFlareWallet = 0
    adapter = null;

    DEVNET_URL = "https://sly-indulgent-wave.solana-mainnet.quiknode.pro/7738767fc1e78d5157e8c6fa4450d9abe43d5127";


    constructor() {
        makeAutoObservable(this);
    }



    getProvider = async () => {
        if (this.selectedWallet === 'phantom') {
            if (!this.adapter) this.adapter = new PhantomWalletAdapter()
        }
        if (this.selectedWallet === 'trust') {
            if (!this.adapter) this.adapter = new TrustWalletAdapter()
        }
        if (this.selectedWallet === 'coibase') {
            if (!this.adapter) this.adapter = new CoinbaseWalletAdapter()
        }
        if (this.selectedWallet === 'solflare') {
            if (!this.adapter) this.adapter = new SolflareWalletAdapter()
        }
        if (this.selectedWallet === 'ledger') {
            if (!this.adapter) this.adapter = new LedgerWalletAdapter()
        }
        return this.adapter

    };

    connectWallet = async () => {
        const provider = await this.getProvider();
        provider.on('connect', () => this.publicKey = provider.publicKey.toString())
        try {
            await provider.connect({ network: 'mainnet-beta' })
        } catch (error) {
            console.log(JSON.stringify(error));
        }

        this.walletConnected = true
    };

    disconnectWallet = async () => {
        const provider = await this.getProvider();
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


    setSwapDir(status) {
        if (status) {
            this.inputMint = sol;
            this.outputMint = toh;
        } else {
            this.inputMint = toh;
            this.outputMint = sol;
        }
    }
    getCurr = async () => {
        const res = await fetch('https://api.dexscreener.com/latest/dex/tokens/C1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB')
        const data = await res.json();

        this.priceUsd = data.pairs[0].priceUsd;
        this.solPerToh = data.pairs[0].priceNative;
        this.mkap = data.pairs[0].marketCap;
    }




}

export const walletStore = new WalletStore();

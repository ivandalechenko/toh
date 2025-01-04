import { observer } from "mobx-react-lite"
import { walletStore } from "./walletStore"

export default observer(() => {
    return (
        <div className="stats">
            <div className="stats_element component">
                <div className="stats_element_header">
                    PRICE
                </div>
                <div className="stats_element_value">
                    ${walletStore.priceUsd}
                </div>
            </div>
            <div className="stats_element component">
                <div className="stats_element_header">
                    MARKET CAP
                </div>
                <div className="stats_element_value">
                    ${numPrettier(walletStore.mkap)}
                </div>
            </div>
        </div>
    )
})



const numPrettier = (num) => {
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + 'm';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + 'k';
    }
    return num.toString();
}

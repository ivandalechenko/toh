export default () => {
    return (
        <div className="tokenomics" id='tokenomics'>
            <div className="tokenomics_title">
                TOKENOMICS
            </div>
            <div className="tokenomics_inner component container">
                <div className="tokenomics_decor free_img">
                    <img src="/img/circle.svg" alt="" />
                </div>
                <div className="tokenomics_content">
                    <div className="tokenomics_market">
                        OPEN MARKET - 100%
                    </div>

                    <div className="tokenomics_supply">
                        <div className="tokenomics_supply_header">
                            TOTAL SUPPLY:
                        </div>
                        <div className="tokenomics_supply_value">
                            1,000,000,000 TOH
                        </div>
                    </div>

                    <div className="tokenomics_cards">
                        <div className="tokenomics_cards_element">
                            <div className="tokenomics_cards_element_header">
                                Initial Distribution:
                            </div>
                            <div className="tokenomics_cards_element_subheader">
                                All tokens were put into circulation at startup with
                                no
                                allocation
                                for the command.
                            </div>
                        </div>
                        <div className="tokenomics_cards_element">
                            <div className="tokenomics_cards_element_header">
                                Burning Mechanism:
                            </div>
                            <div className="tokenomics_cards_element_subheader">
                                All tokens of liquidity providers at launch, which guarantees decentralisation and
                                prevents
                                liquidity manipulation.
                            </div>
                        </div>
                        <div className="tokenomics_cards_element">
                            <div className="tokenomics_cards_element_header">
                                Daily Burning:
                            </div>
                            <div className="tokenomics_cards_element_subheader">
                                Teddy buys up and burns 5 million tokens daily until more than 20% of the total
                                volume
                                (200
                                million TOH) is removed.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
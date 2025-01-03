import FaqElement from "./FaqElement";

const quests = [
    {
        quest: 'What is $TOH?',
        answer: '$TOH (Teddy On Heels) is a decentralized meme coin on the Solana blockchain. It combines humor, an active community, and a deflationary mechanism to offer users both entertainment and earning potential. All tokens were distributed at launch, ensuring full decentralization.',
    },
    {
        quest: 'How does the $TOH burning mechanism work?',
        answer: '$TOH uses a deflationary mechanism: 5 million tokens are burned daily. This process continues until 20% of the total supply (200 million tokens) is removed from circulation, increasing token scarcity and potentially boosting its value.',
    },
    {
        quest: 'Tokenomics',
        answer: 'Total supply: 1,000,000,000 <br/>TOH Distribution: All tokens were put into circulation at launch. The team retained no allocation. <br/>Liquidity: All liquidity tokens were burned, ensuring complete decentralization. <br/>Burning mechanism: 5 million tokens are burned daily to increase scarcity.',
    },
    {
        quest: 'When will I receive $TOH after purchasing?',
        answer: '$TOH will appear in your wallet instantly after completing the purchase. <br/>You can acquire the token through several methods: Connect your wallet and buy TOH directly on the website. <br/>Go to Raydium and purchase TOH there. Use any decentralized exchange(DEX) that supports the token.',
    },
    {
        quest: 'How do I add $TOH to my wallet?',
        answer: "1. Connect your wallet on our website by clicking «Connect Wallet». <br/>2. Select the network and the $TOH token. <br/>3. If $TOH doesn't appear, manually add its address through your wallet's settings. The token will then be visible in your assets list!",
    },
    {
        quest: 'Where is $TOH traded?',
        answer: '$TOH is available for trading on the following decentralized platforms:<br/><br/> Raydium(Solana):Fast and efficient trading with low fees. <br/>DexScreener: View the $TOH trading pair. <br/>DEXTools: Analyze $TOH trading volumes and statistics. <br/>To trade, connect a wallet compatible with the Solana blockchain.',
    },
]


export default () => {
    return (
        <div className="faq" id='faq'>
            <div className="faq_title">
                FAQ
            </div>
            <div className='faq_list'>
                {
                    quests.map((quest, index) => {
                        return <FaqElement key={`quest_${index}`} quest={quest.quest} answer={quest.answer} />
                    })
                }
            </div>

        </div>
    )
}
import { toast } from "react-toastify"

const CA = 'C1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB'

export default () => {

    const copy = () => {

        navigator.clipboard.writeText(CA)
            .then(() => {
                toast.success('Successfully copied!')
            })
            .catch(err => {
                console.error("Err: ", err);
            });
    }

    return (
        <div className="about" id='about'>
            <div className="about_header">
                ABOUT
            </div>
            <div className="about_content component">
                <div className="about_content_element">
                    <div className="about_content_element_dot"></div>
                    All tokens were put into circulation at launch, liquidity is decentralized
                </div>
                <div className="about_content_element">
                    <div className="about_content_element_dot"></div>
                    5 million tokens are burned daily until 20% of the total volume is reached
                </div>
                <div className="about_content_element">
                    <div className="about_content_element_dot"></div>
                    Low fees, high throughput on the Solana blockchain
                </div>
                <div className="about_content_ca">
                    <div className="about_content_ca_header">
                        CA:
                    </div>
                    <div className="about_content_ca_value">
                        <div className="about_content_ca_value_text">
                            {CA}
                        </div>
                        <div className="about_content_ca_value_btn" onClick={copy}>
                            <img src='/img/copy.svg' alt='decor' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
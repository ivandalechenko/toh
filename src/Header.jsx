import Media from "./Media";

export default () => {
    return (
        <div className="header container">
            <div className="header_logo">
                <img src="/img/logo.png" alt="" />
            </div>
            <div className="header_links">
                <a href="#about" className="header_links_element">ABOUT</a>
                <a href="#roadmap" className="header_links_element">ROADMAP</a>
                <a href="#tokenomics" className="header_links_element">TOKENOMICS</a>
                <a href="#faq" className="header_links_element">FAQ</a>
            </div>
            <div className="header_media">
                <Media />
                {/* <button className="header_connect">CONNECT WALLET</button> */}
            </div>
        </div>
    )
}
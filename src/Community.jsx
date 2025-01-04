import { useEffect, useState } from "react";
import Media from "./Media";

let API_URL = 'http://localhost:5000'
API_URL = 'https://api.teddyonheels.com'

export default () => {
    const [tweets, settweets] = useState([]);
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const res = await fetch(`${API_URL}/tweets/`)
        const dataRes = await res.json()
        const tweetsObj = JSON.parse(dataRes.tweets);
        const filteredArray = tweetsObj.filter(item => item.media);
        settweets(filteredArray.sort((a, b) => b.public_metrics.like_count - a.public_metrics.like_count))
        console.log(dataRes[0]);

    }


    return (
        <div className='Community'>
            <div className="Community_title">
                JOIN THE COMMUNITY
            </div>
            <div className='Community_media'>
                <Media />
            </div>
            <div className='Community_top container'>
                {/* <div className='Community_top_header'>
                    Most Watched
                </div> */}
                {
                    tweets.map((tweet, index) => {
                        if (index < 4) {
                            return <a href="https://x.com/Teddyonheels" target="_blank" className='Community_top_element'>
                                <div className='Community_top_element_img'>
                                    <img src={tweet.media} alt="" />
                                </div>
                                <div className='Community_top_element_content'>
                                    <div className='Community_top_element_content_name'>
                                        <div className='Community_top_element_content_name_text'>
                                            @Teddy on Heels
                                        </div>
                                        <div className="free_img Community_top_element_content_name_logo">
                                            <img src="/img/logo.png" alt="" />
                                        </div>
                                    </div>
                                    <div className='Community_top_element_content_text'>
                                        {tweet.text.slice(0, 70)}{tweet.text.length > 70 && '...'}
                                    </div>
                                    <div className='Community_top_element_content_stat'>
                                        <div className='Community_top_element_content_stat_el'>
                                            {tweet.public_metrics.impression_count} views
                                        </div>
                                        <div className='Community_top_element_content_stat_el'>
                                            {tweet.public_metrics.like_count} likes
                                        </div>
                                    </div>
                                </div>
                            </a>
                        }
                    })
                }
            </div>
        </div>
    )
}
import { useState } from "react";

export default ({ quest = '', answer = "" }) => {
    const [opened, setopened] = useState(false);

    return (
        <div className="faq_element component" onClick={() => {
            setopened(!opened)
        }}>
            <div className="faq_element_quest">
                <div className="faq_element_quest_text">
                    {quest}
                </div>
                <div className="faq_element_opener">
                    <img src={`/img/${opened ? 'cross' : 'opener'}.svg`} alt="" />
                </div>
            </div>
            <div className={`faq_element_answer ${!opened && 'dnone'}`} dangerouslySetInnerHTML={{ __html: answer }} >
            </div>
        </div>
    )
}
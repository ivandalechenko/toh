

import Swapper from './Swapper';
import { walletStore } from './walletStore';
import { useEffect } from 'react';
import React, { useState, useMemo } from 'react';


export default () => {

    return (
        <div className="hero container_mini">
            <div className="hero_top">
                <div className="hero_header">
                    TEDDY ON HEELS PAWS TO THE MOON
                </div>
                <div className="hero_subheader">
                    BUY <span>$TOH</span> - SCALE - FUN WITH TEDDY
                </div>
            </div>
            <div className="hero_content">
                <div className="hero_decor">
                    <div className="hero_light free_img">
                        <img src='/img/light.svg' alt='decor' />
                    </div>
                    <div className="hero_dog free_img">
                        <img src='/img/dog.png' alt='decor' />
                    </div>
                </div>
                <Swapper />
            </div>
        </div>
    )
}


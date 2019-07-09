import React, { Component } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';

import cynth from '../cynth.png'

class Hiro extends Component {
    render() {
        return (
            <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
                <Marker parameters={{ preset: 'hiro' }}>
                    <a-assets-item img id="earthImage" src={cynth} />
                    <a-sphere src="#earthImage" radius="1" segments-height="53">
                        <a-animation
                            attribute="rotation"
                            dur="3000"
                            from="1 -90 90"
                            to="360 -90 90"
                            easing="linear"
                            repeat="indefinite" />
                    </a-sphere>
                </Marker>
            </AFrameRenderer>
        );
    }
}



export default Hiro;



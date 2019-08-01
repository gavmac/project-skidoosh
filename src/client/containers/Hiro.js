import React, { Component } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import cynth from '../../cynth.png'



const Hiro = () => {

        return (
            <AFrameRenderer arToolKit={{ sourceType: 'webcam' }} >
                {/*<Marker parameters={{*/}
                {/*    preset: 'pattern',*/}
                {/*    type: 'pattern',*/}
                {/*    patternUrl: 'https://raw.githubusercontent.com/gavmac/project-skidoosh/master/pattern-marker.patt',*/}
                {/*    url: 'https://raw.githubusercontent.com/gavmac/project-skidoosh/master/pattern-marker.patt'*/}
                {/*}}>*/}
                {/*<Marker parameters={{*/}
                {/*    type: 'barcode',*/}
                {/*    barcodeValue: 5,*/}
                {/*    minConfidence: 0.9*/}
                {/*}}>*/}
                <Marker parameters={{preset: 'hiro'}}>
                    <a-image id="earthImage" src={cynth} />
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
                    )


}

export default Hiro;



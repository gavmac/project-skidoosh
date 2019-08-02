import React, { Component } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';

import userProfile from './profile-a.jpg';
import profileInfo from './profile-b.jpg';
import arrowIcon from './arrow.png';

class Profile extends Component {
    render() {
        return (
            <AFrameRenderer arToolKit={{ sourceType: 'webcam' }}>

                <Marker parameters={{
                    preset: 'pattern',
                    type: 'pattern',
                    minConfidence: 0.3,
                    patternUrl: 'https://raw.githubusercontent.com/gavmac/project-skidoosh/master/pattern-marker.patt',
                    url: 'https://raw.githubusercontent.com/gavmac/project-skidoosh/master/pattern-marker.patt'
                }}>
                    {/*<Marker parameters={{preset: 'hiro'}}>*/}

                    <a-assets-item img id="userProfile" src={userProfile} />
                    <a-assets-item img id="profileInfo" src={profileInfo} />
                    <a-assets-item img id="arrowIcon" src={arrowIcon} />

                    <a-entity camera look-controls mouse-cursor>
                        <a-entity
                            id="profile"
                            profile-listener
                            cursor="fuse: true; fuseTimeout: 500"
                            position="0 -1.5 0"
                            geometry="primitive: box; height: 0.1; depth: 1.5; rotation: 90 0 0;"
                            material="shader: flat;"
                            visible="false">
                            <a-animation attribute="position"
                                         dur="3000"
                                         begin="profileAnimation"
                                         from="-1.5 0 0"
                                         to="-0.5 -1.5 0"/>
                        </a-entity>

                        <a-entity
                            id="profile-info"
                            profile-info-listener
                            cursor="fuse: true; fuseTimeout: 500"
                            position="0 -1.5 0"
                            geometry="primitive: box; height: 0.1; depth: 1.5; rotation: 90 0 0;"
                            material="shader: flat; src: #profileInfo"
                            visible="false">
                            <a-animation attribute="position"
                                         dur="3000"
                                         begin="profileInfoAnimation"
                                         from="-1 -0.5 0"
                                         to="0.5 -1.5 0"/>
                        </a-entity>

                        <a-entity
                            id="arrow-icon"
                            arrow-icon-listener
                            scale="0.6 0.6 0.6"
                            cursor="fuse: true; fuseTimeout: 500"
                            position="0 1.5 0.5"
                            geometry="primitive: box; height: 0.03; rotation: 90 0 0;"
                            material="shader: flat; src: #arrowIcon" />

                    </a-entity>

                </Marker>
            </AFrameRenderer>
        );
    }
}


export default Profile;

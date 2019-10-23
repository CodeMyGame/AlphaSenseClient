import React from 'react'

export default ({message }) =>{

        return(
            <div className="incoming_msg">
                <div className="incoming_msg_img"><img src="https://ptetutorials.com/images/user-profile.png" alt=""/>
                </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        )
}

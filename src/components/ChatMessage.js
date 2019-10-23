import React from 'react'

export default ({message }) =>{

        return(
            <div className="incoming_msg">
                <div className="incoming_msg_img"><img  src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" alt=""/>
                </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        )
}

import { ArrowRightIcon } from '@primer/octicons-react'
import React, { useEffect, useState } from 'react'
import { getDatabase, onChildAdded, push, ref } from 'firebase/database'

const Chats = () => {
    const [reply, setReply] = useState("")
    const [messages, setMessages] = useState([])
    // const [uid, setUid] = useState(localStorage.getItem(uid))

    console.log(messages);
    useEffect(() => {

        const unsubscribe = onChildAdded(ref(getDatabase(), "messages/t8QV7laQMdgaol3smIbaD8dxHdy21677127724271"), (snap) => [
            setMessages(pre => ([
                ...pre, {
                    msg: snap.val().message,
                    isdoctor: snap.val().isdoctor
                }
            ]))
        ])

        return () => unsubscribe
    }, [])

    const sendmessage = () => {
        if (reply != "")
            push(ref(getDatabase(), `messages/t8QV7laQMdgaol3smIbaD8dxHdy21677127724271`),{
                message:reply,
                isdoctor:false
            }).then(() => {
                setReply("")
            }).catch(err=>{
                console.log(err);
            })
    }
    return (
        <div>
            <div className='chats'>
                <div className='chatanddoc'>
                    <div className='chatDoctor'>
                        <b>Dr. Lokesh</b>
                    </div>
                    <div className='messgArea'>
                        {
                            messages.map((msg,i) => (
                                <div key={i} className='msgcon'>
                                    <div className={msg.isdoctor ? 'recMessg' : 'sendMessg'}>
                                        {msg.msg}
                                    </div>
                                </div>
                            ))
                        }
                        {
                            // messages.length==0&&
                            // (

                            // )
                        }
                    </div>
                </div>
                <div className='chatbox'>
                    <input
                    value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        type="text" placeholder='Enter mesage here...' />
                    <div onClick={() => sendmessage()} className='sendbtn'>
                        <ArrowRightIcon size={24} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats
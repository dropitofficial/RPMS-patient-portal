import { ArrowRightIcon } from '@primer/octicons-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { getDatabase, onChildAdded, push, ref } from 'firebase/database'
import { FireContext } from '../Config/Firebase'

const Chats = () => {
    const [reply, setReply] = useState("")
    const [messages, setMessages] = useState([])
    const messageEnd = useRef(null)
    const {userdetails} = useContext(FireContext)
    const [loaded, setloaded] = useState(false)
    // const [uid, setUid] = useState(localStorage.getItem(uid))

    const scrollToBottom = () =>{
        messageEnd.current.scrollIntoView({
        block: 'end', 
        behavior:"smooth"
        })
    }

useEffect(() => {
  scrollToBottom()
}, [messages])


    useEffect(() => {
        const unsubscribe = onChildAdded(ref(getDatabase(), `/messages/${userdetails.uid}`), (snap) => [
            setMessages(pre => {
                if(pre.length && pre[pre.length-1].msg == snap.val().message) return pre

                return [
                    ...pre, {
                        msg: snap.val().message,
                        isdoctor: snap.val().isdoctor
                    }
                ]
            })
        ])
        setloaded(true)
        return () => unsubscribe
    }, [])

    const sendmessage = () => {
        if (reply != "")
            push(ref(getDatabase(), `/messages/${userdetails.uid}`),{
                message:reply,
                isdoctor:false
            }).then(() => {
                console.log("dfgdfg");
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
                            messages.length==0&&loaded&&
                            (
                                <div className="chatloader loader"></div>
                            )
                        }
                        <div className='msgcon height0' style={{opacity:0, margin:0, padding:0}} ref={messageEnd}></div>
                    </div>
                </div>
                <div className='chatbox'>
                    <input
                    value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        onKeyDown={(e)=>{
                            if(e.key == "Enter"){
                                sendmessage()
                            }
                        }}
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
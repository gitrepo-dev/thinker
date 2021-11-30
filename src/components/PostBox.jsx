import React, {useState} from 'react'
import photo from '../assets/images/image.png'
import youtube from '../assets/images/youtube.png'
import calendar from '../assets/images/calendar.png'
import timeline from '../assets/images/timeline.png'
import Modal from './Modal'

export default function PostBox() {

    const [show, setShow] = useState(false)

    return (
        <>
            <div className="max-w-xl p-5 rounded-md mx-auto mb-5 border-2 border-gray-300 mt-10 bg-white">
                <div type="text" name="" id="" className="w-full py-3 px-5 rounded-full text-gray-500 mb-4 border-2 border-gray-300 cursor-pointer" onClick={()=>setShow(show ? false : true)}>Post a thought</div>
                <div className="grid grid-cols-4 gap-4 mt-3">
                    <span><img src={photo} onClick={()=>setShow(show ? false : true)} alt="" className="ml-2 cursor-pointer" /></span>
                    <span className="mx-auto cursor-pointer"><img src={youtube} alt="" onClick={()=>setShow(show ? false : true)} /></span>
                    <span className="mx-auto cursor-pointer"><img src={calendar} alt="" onClick={()=>setShow(show ? false : true)} /></span>
                    <span className="ml-auto mr-2 cursor-pointer"><img src={timeline} alt="" onClick={()=>setShow(show ? false : true)} /></span>
                </div>
            </div>
            <Modal behave={show} onClick={() => setShow(show ? false : true)} />
        </>
    )
}

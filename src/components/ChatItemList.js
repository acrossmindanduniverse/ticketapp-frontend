import React from 'react'
import { Image, Button } from 'react-bootstrap'
import { BiCheckDouble, BiDotsVerticalRounded, FaPlaneDeparture } from 'react-icons/all'
import airline from '../assets/airlineIcon.png'
import qr from '../assets/qr.png'
import imgChat from '../assets/imgChat.png'
import imgUser from '../assets/user.png'
import { Link } from 'react-router-dom'

const ChatItemList = ({ fullname, message, img, to, time }) => {
  return (
    <Link style={styleCoba.parentAll} to={to} className="d-flex flex-column m-2">
            <div className="d-flex flex-row justify-content-between align-items-center border-1 border-bottom p-2">
              <div className="d-flex flex-row align-items-center gap-3">
                {/* {img !== null ? <Image src={img} /> :  */}

                {/* // } */}
                <Image style={styleCoba.img} src={imgUser}/>
                <div className="d-flex flex-column">
                  <h6>{fullname}</h6>
                  <p>{message}</p>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <h6>{time}</h6>
                <BiCheckDouble />
              </div>
            </div>

          </Link>
  )
}

export default ChatItemList

const styleCoba = {
  parentAll: {
    textDecoration: 'none',
    color: '#000'
  },
  img: {
    width: 50,
    height: 50
  }
}

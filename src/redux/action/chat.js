/* eslint-disable no-undef */
import { http } from '../../helpers/http'

import Swal from 'sweetalert2'

const { REACT_APP_BACKEND_URL: URL } = process.env

export const chatList = (token) => {
  return async (dispatch) => {
    const { data } = await http(token).get(`${URL}/chats/chat`)
    dispatch({
      type: 'CHAT_LIST',
      payload: data.data
    })
  }
}

export const chatRoom = (token, id) => async dispatch => {
  try {
    const { data } = await http(token).get(`${URL}/chats/room/${id}`);
    dispatch({
      type: 'CHAT_ROOM',
      payload: data.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const sendChat = (token, id, setData) => async dispatch => {
  const form = new FormData()
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  form.append('message', setData.message);
  form.append('attachment', setData.attachment);
  try {
    const { data } = await http(token).post(`${URL}/chats/send/${id}`, form);
    dispatch({
      type: 'SEND_CHAT',
      payload: data.data
    });
    Toast.fire({
      icon: 'success',
      title: 'Message Send'
    })
  } catch (err) {
    console.log(err);
  }
};

export const deleteChat = (token, id, chatId) => async dispatch => {
  const form = new URLSearchParams();
  form.append('chatId', chatId);
  try {
    const { data } = await http(token).delete(`${URL}/chats/delete/${id}`, {
      data: form
    });
    console.log(data, 'action data123');
    dispatch({
      type: 'DELETE_CHAT',
      payload: data.data
    });
    dispatch(chatList(token));
    dispatch(chatRoom(token, id));
  } catch (err) {
    console.log(err);
  }
};

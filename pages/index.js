import { useState } from 'react';
import Link from 'next/link'
import api from '../utils/api';

// import '../style.css';

const Index = () => {
  const [guest, setGuest] = useState({
    name: '',
    message: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuest({...guest, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, message } = guest;
    if (!name || !message) {
      setErrorMsg('You must provide your name and message');
      setTimeout(() => {
        setErrorMsg('')
      }, 1000);
    } else {
      const post = await api.postGuest(guest);
      const { message } = post.data;
      setSuccessMsg(message);
      setTimeout(() => {
        setSuccessMsg('');
      }, 1000);
    }
  }

  return (
    <div className='container'>
      <div className='link'>
        <Link href='/guestbook'>
          <a>View Guests</a>
        </Link>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' name='name' onChange={handleInputChange}></input>
        <label>Message</label>
        <textarea name='message' rows='3' onChange={handleInputChange}></textarea>
        <input type='submit' className='submit-button'></input>
      </form>
      {
        successMsg ? <h3 className='success-msg'>{successMsg} ✅</h3> : null
      }
      {
        errorMsg ? <h3 className='error-msg'>{errorMsg} ⛔️</h3> : null
      }
    </div>
  )
}

export default Index;

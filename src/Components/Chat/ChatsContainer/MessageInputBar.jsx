//==========EXTERNAL IMPORTS
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import ImageIcon from '@mui/icons-material/Image';
//==========INTERNAL IMPORTS
import { useContext, useEffect, useRef, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SocketContext from '@/Sockets/socketContext';
import ImagePreview from './ImagePreview';
import toast from 'react-hot-toast';
//=========import { audioHandler } from '@/Redux/Slices/Models';


function MessageInputBar() {
  
  const [newMessage, setNemMessage] = useState({ id:"", text: "" });
  const [image, setImage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const emojiRef = useRef();
  const user = useSelector(store => store.user);
  const { targetUserId } = useParams();
  const { socket } = useContext(SocketContext);
  const [imagePreview, setImagePreview] = useState(false);
  const fileImageRef = useRef(null);

  useEffect(() =>
  {
    function onClickOutsideHandler(event)
    {
      if(emojiRef.current && !emojiRef.current.contains(event.target))
      {
        setEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", onClickOutsideHandler);
    return () =>
    {
      document.removeEventListener("mousedown",onClickOutsideHandler);
    }
  },[emojiRef])
  
  //EMOJI HANDLER
  const emojiHandler = (emoji) =>
  {
    setNemMessage(ps => ({...ps,text:ps.text + emoji.emoji}));
  }

  const sendMessageHandler =(event) => {
    event.preventDefault();
    console.log("Sending Message");
    if (!newMessage.text && !imagePreview) return;
    //============SEND MESSAGE TO SOCKET================
    socket?.emit('sendMessage', {
      userId: user?._id,
      targetUserId,
      msgText: newMessage.text,
      imageUrl:imagePreview
    });
    // dispatch(currentChatDataHandler([{ ...currentChatData[0], messages: [...currentChatData[0].messages, { senderId: user, text: newMessage.text }]}]));
    if(fileImageRef.current)
    {
        fileImageRef.current.value = "";
    }

    setNemMessage({
      id:crypto.randomUUID(),text:""
    });
    setImagePreview("");
  };

  const imageChangeHandler = (e)=>
  {
    
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected");
    };
    const reader = new FileReader();
    reader.onloadend = () =>
    {
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  }

   
  const removeImage = () =>
  {
    setImage("");
    setImagePreview(false);
  }

  return (
    
    <>
      {imagePreview && <ImagePreview image={imagePreview} removeImage={removeImage} />}
      <form onSubmit={sendMessageHandler} className="h-10vh] flex px-3 mb-6 gap-6 ">
        <div  className="w-[90vw] flex bg-zinc-200 border-black border-[0.5px] text-black rounded-md items-center md:gap-5 md:pr-5">
          
          <input
            type="text"
            className="flex-1 p-5 bg-transparent border-none rounded-md focus:border-none focus:outline-none"
            placeholder="Enter Message"
            value={newMessage.text}
            onChange={(e) => setNemMessage(ps=>({...ps,text:e.target.value}))}
          />


          <input
            type="file"
            className="hidden"
            accept='image/*'
            onChange={imageChangeHandler}
            ref={fileImageRef}
          />

          <button  onClick={()=>fileImageRef.current?.click()} className="text-neutral-500 focus:border-none focus:outline-none focus:text-grey-600 duration-300 transition-all">
            <ImageIcon  className={`text-2xl text-gray-500 ${imagePreview?"text-green-500":""}`} />
          </button>

          {/* <button onClick={ ()=>dispatch(audioHandler(true))}  className="focus:border-none focus:outline-none focus:text-grey-600 duration-300 transition-all">
          <KeyboardVoiceIcon className="text-2xl cursor-pointer  text-black" />
          </button> */}

          <div className="relative">
            <button type='button' onClick={()=>setEmojiPicker(true)} className="text-neutral-500 focus:border-none focus:outline-none focus:text-black duration-300 transition-all">
              <EmojiEmotionsIcon className="text-2xl text-grey" />
            </button>

            <div className="absolute bottom-14 right-0" ref={emojiRef}>
              <EmojiPicker theme='light'
                autoFocusSearch={false}
                onEmojiClick={emojiHandler}
                open={emojiPicker}
                height={400}/>
            
            </div>
          </div>
        </div>


        <button type='submit' onClick={sendMessageHandler} className="bg-[#fe3c72] rounded-md flex items-center justify-center p-5 focus:border-none hover:bg-[#741bdal] focus:bg-[#741bdal] focus:outline-none focus:text-white duration-300 transition-all">
          <SendIcon className="text-2xl text-black" />
        </button>
      </form>
        </>
        
    )
}

export default MessageInputBar;



  
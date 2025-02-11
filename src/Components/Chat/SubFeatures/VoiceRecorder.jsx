import { audioHandler } from '@/Redux/Slices/Models';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
function VoiceRecorder() {
  let { audio } = useSelector((store) => store.model);
  const audioRef = useRef();
  let dispatch = useDispatch();

  // FUNCITON TO HANDLE CLCIK OUTSIDE
  useEffect(() => {
    function onClickOutsideHandler(event) {
      if (audioRef.current && !audioRef.current.contains(event.target)) {
        dispatch(audioHandler(false));
      }
    }

    document.addEventListener('mousedown', onClickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', onClickOutsideHandler);
    };
  }, [audioRef]);

  //RECORDER CONTORLLS
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (error) => {
      console.log('Some thing went wrong');
    }
  );

  // TO ADD AUDIO ELEMENT
  const addAudioElement = (Blob) => {
      const url = URL.createObjectURL(Blob);
      console.log(url);
    //NOW WE WILL CREATE THE AUDIO ELEMENT
    const audioElement = document.createElement('audio'); //WE CREATED THE AUDIO ELEMET IN OUT DOM
    audio.src = url; //HERE WE SET THE URL OF THE AUDI ELEMETN THAT WE HAVE CREATED
    audio.controls = true;
    const targetContainer = document.getElementById('audio-box');
    targetContainer.appendChild(audioElement);
  };

  return (
    <div
      className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center
        bg-black bg-opacity-70 black ${audio ? 'flex' : 'hidden'}`}
    >
      <div
        className="md:px-17 wpfull max-w-147 rounded w-[350px] bg-white dark:bg-boxdark md:py:8 px-8 py-12"
        ref={audioRef}
      >
        <div
          id="audio-box"
          className="flex flex-col w-full justify-around items-center"
        >
          <AudioRecorder
            showVisualizer={true}
            onRecordingComplete={(Blob) => addAudioElement(Blob)}
                      recorderControls={recorderControls}
                      downloadOnSavePress={true}
                      downloadFileExtension='mp3'
                  />
                  
                  <div className='flex justify-between  mt-4 w-[60%'>
                      <button onClick={()=>dispatch(audioHandler(false))} className='bg-blue-600 hover:bg-blue-700 rounded text-black h-[40px] w-[100px] font-semibold'>Send</button>
                      <button onClick={()=>dispatch(audioHandler(false))} className='bg-gray-300 rounded ms-2 h-[40px] hover:bg-gray-400 w-[100px] text-black font-semibold'>Cancel</button>
                  </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceRecorder;

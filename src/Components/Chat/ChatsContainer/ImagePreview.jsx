import CancelIcon from '@mui/icons-material/Cancel';

function ImagePreview({removeImage, image: imageurl }) {
  
  if (!imageurl) return null;
  return (
    <div className="ms-7 mb-2 w-auto  bg-opacity-30 backdrop-blur-sm">
      <div className="  right-0 p-1 w-36 flex justify-end">
        <CancelIcon
          className="hover:text-red-500 text-white hover:bg-white bg-black rounded-full  cursor-pointer absolute "
          onClick={() => removeImage()}
        />
      </div>
      <img className="w-32 h-32 rounded-sm shadow-xl" src={imageurl} />
    </div>
  );
}

export default ImagePreview;

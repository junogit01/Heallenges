import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ImagePlaceholder from './ChallengeAddImagePlaceholder';
import { clearConfigCache } from 'prettier';

function ImageInput({ setData, data, propName, inputData }) {
  const [value, setValue] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const imgRef = useRef();

  useEffect(() => {
    if (inputData) {
      setValue(inputData);
    }
  }, [inputData]);

  const handleChange = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
      // const imageUrl = URL.createObjectURL(file);
      setData({
        ...data,
        [propName]: file,
      });
      setValue(file);
    } else {
      setData({
        ...data,
      });
    }
  };

  return (
    <Label>
      {value ? <Img src={imgFile || value} width={200} alt="도전 이미지" /> : <ImagePlaceholder />}
      <input type="file" hidden onChange={handleChange} ref={imgRef} />
    </Label>
  );
}

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Label = styled.label`
  cursor: pointer;
  width: 300px;
  height: 200px;
`;

export default ImageInput;

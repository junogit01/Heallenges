import { useState } from 'react';
import styled from 'styled-components';
import ImagePlaceholder from './ImagePlaceholder';

function ImageInput({setData, data, propName}) {
  const [value, setValue] = useState();
  const handleChange = event => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setData({
        ...data,
        [propName]: imageUrl,
      });
      setValue(imageUrl);
    }
  };

  return (
    <Label>
      {value ? <Img src={value} width={200} alt="도전 소개" /> : <ImagePlaceholder />}
      <input type="file" hidden onChange={handleChange} />
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

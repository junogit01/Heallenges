import styled from 'styled-components';

function ImagePlaceholder() {
  return <Wrapper>클릭하여 이미지를 업로드하세요</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  background: #eee;
  border-radius: 8px;
  color: #333;
`;

export default ImagePlaceholder;

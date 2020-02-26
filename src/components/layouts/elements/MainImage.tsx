import React, { ReactNode } from 'react';
import placeholder from '../images/169.png';
import styled from 'styled-components';
import { IElement, IMainImageValue } from '../../../interfaces';
import { API_BASE } from '../../../actions';

export interface IMainImage {
  image: IElement<IMainImageValue>;
}

const Placeholder = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 -30px;
  background: rgb(128,128,128,.2);
  margin-bottom: 30px;

  & > img {
    width: 100%;
  }
`

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

const MainImage: React.FC<IMainImage> = ({image}) => {
  const { leadImage, leadImageCaption } = image.value;
  let imgComponent: ReactNode = null;

  if(leadImage && leadImage.renditions) {
    const { lead } = leadImage.renditions;
    imgComponent = (
      <Img 
        src={API_BASE+lead.source} 
        key={lead.source} 
        alt={leadImageCaption.value} 
      />
    )
  }

  return (
    <Placeholder>
      <img src={placeholder} alt="" />
      {imgComponent}
    </Placeholder>
  );
}

export default MainImage;
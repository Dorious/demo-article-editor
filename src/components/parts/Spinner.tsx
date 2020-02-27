import React, { ReactNode } from 'react';
import styled, { keyframes, CSSProperties } from 'styled-components';

const DEFAULT_WIDTH = 20;

export interface ISpinnerProps {
  width?: number;
  style?: CSSProperties;
  color?: string;
}

export interface IInfinitySpinnerProps extends ISpinnerProps {}

export const SpinBallOpacity = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  0% { opacity: 0.2; }
`;

export const SpinBall = styled.i.attrs((props:any) => ({
  style: {
    background: props.color || props.spinnerColor
  }
}))`
  display: block;
  width: 46%;
  margin: 2%;
  height: 46%;
  border-radius: 50%;
  animation: ${SpinBallOpacity} 1s infinite;
  animation-delay: ${() => Math.random()*0.5}s;

  :nth-child(3) {
    clear: left;
  }
`;

export const SpinnerRotate = keyframes`
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
`;

export const SpinBalls = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  animation: ${SpinnerRotate} 1s infinite;
  animation-timing-function: linear;
`;

export const SpinBallsContainer = styled.div`
  display: inline-block;
`;

/**
 * Shows spinning circles
 * @param props - Check ISpinnerProps
 */
const Spinner: React.FC<ISpinnerProps> = (props) => {
  const {style, color} = props;

  const containerStyle = {...style,
    width: props.width ? props.width : DEFAULT_WIDTH,
    height: props.width ? props.width : DEFAULT_WIDTH
  };

  return (
    <SpinBallsContainer style={containerStyle}>
      <SpinBalls>
        <SpinBall color={color} />
        <SpinBall color={color} />
        <SpinBall color={color} />
        <SpinBall color={color} />
      </SpinBalls>
    </SpinBallsContainer>
  )
}

/** Up & Down anim movement for InfinitySpinner */
export const upDown = keyframes`
  0% { transform: translateY(0); }
  25% { transform: translateY(-20px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(20px); }
  100% { transform: translateY(0); }
`
/** Right / Left anim movement for InfinitySpinner */
export const leftRight = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(40px); }
  50% { transform: translateX(0); }
  75% { transform: translateX(-40px); }
  100% { transform: translateY(0); }
`

export const InSpinUpDown = styled.div`
  animation: ${upDown} 1s infinite;
  animation-timing-function: linear;
`;

export const InSpinLeftRight = styled.div`
  animation: ${leftRight} 2s infinite;
  animation-timing-function: linear;
`;

export const InSpinContainer = styled.div`
  width: ${(props: IInfinitySpin) => props.containerWidth}px;
  height: ${(props: IInfinitySpin) => props.containerWidth ? Math.round(props.containerWidth*0.6)+'px' : 'auto'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface IInfinitySpin {
  spinner?: (props: any) => ReactNode;
  containerWidth?: number;
}

export const InfinitySpin: React.FC<IInfinitySpin> = (props) => {
  const {containerWidth, spinner} = props;

  return (
    <InSpinContainer containerWidth={containerWidth}>
      <InSpinLeftRight>
        <InSpinUpDown>
          {spinner ? spinner(props) : null}
        </InSpinUpDown>
      </InSpinLeftRight>
    </InSpinContainer>
  )
}

InfinitySpin.defaultProps = {
  containerWidth: DEFAULT_WIDTH*5
}

export const InfinitySpinner: React.FC<IInfinitySpinnerProps> = (props) => {
  const { width } = props;

  let spinProps = {
    ...props, 
    width: width ? width/5 : undefined
  };

  return (
    <InfinitySpin 
      containerWidth={width} 
      spinner={() => <Spinner {...spinProps} />} 
    />
  );
} 

export default Spinner;
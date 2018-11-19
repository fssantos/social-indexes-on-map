import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction:'column';
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 95%;
    height: 500px;
`;

export const Circle = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: red;   
`;

export const Tooltip = styled.div`
  position: absolute;
  margin: 8px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  max-width: 300px;
  font-size: 10px;
  z-index: 9;
  pointer-events: none;`
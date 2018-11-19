import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction:column;
    border-radius: 5px;
    border: 1px solid grey;
    width: 300px;
    margin-left: 10px;
    padding: 10px;
`;

export const Select = styled.select`
    width:  80%;
    height: 40px;
    background-color: DodgerBlue;
    color: white;
    border-color:transparent transparent rgba(0, 0, 0, 0.1) transparent;
    font-size: 15px;
    align-self: flex-end;
`

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
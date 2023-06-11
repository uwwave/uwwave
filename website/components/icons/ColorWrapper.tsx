import styled from "styled-components";

interface IIconColorWrapper {
  color: string;
}
export const IconColorWrapper = styled.div<IIconColorWrapper>`
  color: ${props => props.color};
  display: flex;
`;

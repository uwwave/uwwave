import styled from "styled-components";

interface ICenter {
  gap?: number;
}
export const Center = styled.div<ICenter>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => `${props.gap}px` ?? "initial"};
`;

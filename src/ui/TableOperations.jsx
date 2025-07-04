import styled from "styled-components";

const StyledTableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function TableOperations({ children }) {
  return <StyledTableOperations>{children}</StyledTableOperations>;
}

export default TableOperations;

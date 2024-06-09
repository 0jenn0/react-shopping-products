import styled from '@emotion/styled';

export const ToastContainer = styled.div`
  /* background-color: red;
  display: flex;
  justify-content: center;
  align-items: center; */

  position: fixed;
  min-width: 300px;
  width: fit-content;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  padding: 20px 30px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  animation: toastAnimation 3s forwards;
  color: black;
  font-size: 15px;
  font-weight: 700;

  @keyframes toastAnimation {
    0% {
      bottom: -100px;
      opacity: 0.5;
    }
    15% {
      bottom: 40px;
      opacity: 1;
    }
    80% {
      bottom: 40px;
      opacity: 1;
    }
    100% {
      bottom: -100px;
      opacity: 0.5;
    }
  }
`;

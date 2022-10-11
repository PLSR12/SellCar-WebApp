import styled from 'styled-components'

export const Container = styled.div`
  label {
    display: block;
    padding: 0 0 8px 0;
    font-size: 13px;
    font-weight: 600;
    color: #000;
    letter-spacing: 0em;
    text-align: left;
  }
  textarea {
    height: 103px;
    min-width: 100%;
    width: 100%;
    padding: 14px 12px;
    border-radius: 4px;
    border: 1px solid #ced4da;

    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 16px;

    &:hover::placeholder {
      color: #919eab;
    }

    &:hover {
      border-color: #000;
    }

    &::placeholder {
      color: #c4cdd5;
    }

    &:focus {
      border: 1px solid #000;
    }

    &:disabled {
      background-color: #dcd4d4;
    }
  }
  div {
    color: #d90f06;
    margin: 5px 0 0 5px;
  }
`

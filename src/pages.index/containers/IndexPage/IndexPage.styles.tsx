import styled from '@emotion/styled'

export const Layout = styled.section`
  width: 100%;
  padding: 20px;
  font-size: 16px;
  border-radius: 3px;

  @media (min-width: 992px) {
    margin: 20px auto 0;
    max-width: 800px;
  }
`

export const NameInput = styled.input`
  width: 100%;
  padding: 10px 20px;
`

export const DoctorSelection = styled.div`
  margin: 20px 0 0;

  .select {
    margin: 10px 0 0;
    padding: 10px 20px;
  }
`

export const TimeSelection = styled.div`
  margin: 20px 0 0;
`

export const Complaints = styled.div`
  margin: 20px 0 0;

  textarea {
    margin: 10px 0 0;
    padding: 10px 20px;
    width: 100%;
    height: 200px;
    font-size: 16px;
  }
`
export const Status = styled.div`
  margin: 10px 0 0;
  &.error {
    color: #AA3300;
  }
  &.success {
    color: #33AA00;
  }
`

export const Submit = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 0;
  padding: 6px 10px;
  border: 1px solid #555555;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: #EEEEEE;
  }
`

export const Info = styled.div`
  margin: 10px 0 0;
`

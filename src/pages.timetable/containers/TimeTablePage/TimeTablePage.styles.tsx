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

  table {
    margin: 20px 0 0;
    width: 100%;
    border-collapse: collapse;
    td {
      border-left: 1px solid #AAAAAA;
      border-top: 1px solid #AAAAAA;
      padding: 6px;
      &:first-of-type {
        border-left: none;
      }
    }
    thead td {
      border-top: none;
    }
  }
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
export const Error = styled.div`
  margin: 10px 0 0;
  color: #AA3300;
`
import { Button } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas: 
  "header header header"
  "main main main"
  "footer footer footer"
  ;
`

export const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 5px 5px #e7e7e7;
  padding: 0px 60px;
`

export const HeaderLeft = styled.div`
  font-size: 20px;
  span {
    margin-right: 15px;
    cursor: pointer;
    font-weight: 700;
  }
`

export const HeaderRight = styled.div`
`

export const Main = styled.main`
  grid-area: main;
  padding: 40px;
`

export const Footer = styled.footer`
  grid-area: footer;
`

export const CustomButton = styled(Button)`
  padding: 0;
`
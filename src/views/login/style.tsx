import styled from 'styled-components'
import leftImage from '@/assets/image/left.svg'
import rightImage from '@/assets/image/right.svg'
import logoImage from '@/assets/image/logo.svg'
export const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #fff;
`

export const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: left bottom, right bottom;
  background-image: url(${leftImage}), url(${rightImage});
  background-attachment: fixed;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
`

export const Contanter = styled.div`
  width: 400px;
  height: 500px;
  box-shadow: 0px 0px 20px 5px #ccc;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Header = styled.div`
  position: relative;
  font-size: 20px;
  color: rgb(98, 100, 115);
  text-align: center;
  height: 50px;
  line-height: 50px;
  margin-top: 40px;
`

export const Logo = styled.div`
  top: -110px;
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(${logoImage});
  background-position: center;
`

export const Main = styled.div`
  width: 100%;
  padding: 10px 30px 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    width: 100%;
  }
`
export const Btns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80px;
`

export const Footer = styled.div`
  padding: 0 30px;
`

export const FooterSpan = styled.div`
  text-align: center;
  color: #0946c1;
  font-weight: 700;
  cursor: pointer;
`
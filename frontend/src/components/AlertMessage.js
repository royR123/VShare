import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background-color: inherit;
    width : 100%
`
const Good = styled.div`
    border: 4px solid green;
    color : green;
    font-weight: bolder;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 5px;

`
const Bad = styled.div`
    border: 4px solid red;
    color : red;
    font-weight: bolder;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 5px;
`

const AlertMessage = ({ type , message }) => {
  return (
    <Container>
        {type === 0 && <Bad>{message}</Bad>}
        {type === 1 && <Good>{message}</Good>}

    </Container>
  )
}

export default AlertMessage
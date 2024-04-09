
import React, { useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import './App.css';


export default function App() {
const [data,setData] = useState([])
const [prompt,setPrompt] = useState('')
const [id,setId] = useState(1)
  const runChat =  (event) => {
	event.preventDefault();
	console.log('Hello')
	if(prompt !== '') {
		axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDbF9GC1hBd0HqW4bJ8KnbXCdc7KaCXITo', {
			"contents":[{"parts":[{"text":prompt}]}]
		  })
		  .then(function (response) {
			const newid = id+1
			setData([...data,{send:prompt,recive:response['data']['candidates'][0]['content']['parts'][0]['text'],id:id,newid:newid}])
			setId(id+5)
			setPrompt('')
		  })
		  .catch(function (error) {
			console.log("error");
		  });
	}
   
  }
 


const chatRender = () => {
	return data.map((item)=> (
		<>
			<ChatBox key={item.id} >
				<ProfileIcon src={(require('./assets/images/3.jpg'))} />
				<Message>{item.send}</Message>
			</ChatBox>
			<ChatBox key={item.newid} className='recive'>
				<ProfileIcon src={(require('./assets/images/sparkler.png'))} />
				<Message>{item.recive}</Message>
			</ChatBox>
		</>
	))
}
  return (
   <Container>
        <LeftContainer>
            <ImageContainer>
                <Image src={(require('./assets/images/3.jpg'))} />
            </ImageContainer>
            <ToolContainer>
                 <IconImage src={(require('./assets/images/list.png'))} />
                 <Image src={(require('./assets/images/setting.png'))} />
            </ToolContainer>
        </LeftContainer>
        <MianContainer>
            <InputContainer onSubmit={runChat}> 
                <InputBox type='text'  placeholder="Enter Prompt" value={prompt}  onChange={(e)=> setPrompt(e.target.value)}  />
				<SendButton type="submit" onClick={()=> runChat}><SendIcon src={(require('./assets/images/send.png'))}/></SendButton>
            </InputContainer>
			<ChatSection className='chatsectionbar'>{chatRender()}</ChatSection>
				
			
        </MianContainer>
   </Container>
  )
}



const Container = styled.div`
min-height: 100vh;
width: 100%;
background-color: #000;
display: flex;
flex-direction: row;
max-height: 100vh;
overflow: hidden;
`
const LeftContainer = styled.div`
height: 100vh;
width: 10%;
background-color: #000;
border-right: 2px solid #fff;
display: flex;
justify-content: space-between;
flex-direction: column;
align-items: center;

`
const MianContainer = styled.div`
width: 85%;
`
const ImageContainer = styled.div`
padding-top: 44px;
width: 50%;
`
const Image = styled.img`
width: 70px;
height: 70px;
border-radius: 50%;

`
const ToolContainer = styled.div`
padding-bottom: 44px;
justify-content: space-between;
display: flex;
flex-direction: column;
`
const IconImage = styled.img`
margin-bottom: 22px;

`
const InputContainer = styled.form`
width: 100%;
justify-content: center;
display: flex;

`
const InputBox = styled.input`
margin-top: 44px;
background-color: #fff;
color:#fff;
font-size: 14px;
height: 50px;
width: 40%;
background-color: #202427;
outline: none;
border: none;
border-radius: 56px;
padding-left: 44px;
`
const SendIcon = styled.img`
height: 25px;
width: 25px;
position: absolute;
top:55px;
right: 32%;
`
const SendButton = styled.button`
background-color: transparent;
border: none;
`
const ChatSection = styled.div`
margin-top: 24px;
display: flex;
align-items: center;
flex-direction: column;
height: 80vh;
overflow-y: auto;
`
const ChatBox = styled.div`
width: 60%;
margin-top: 24px;
display: flex;
position: relative;
height: auto;
`
const ProfileIcon = styled.img`
width: 50px;
height: 50px;
border-radius: 25px;

`
const Message = styled.p`
color: #fff;
margin-left: 24px;
font-size: 18px;
line-height: 1.8;
`
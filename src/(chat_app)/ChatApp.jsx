import { chatStore } from "../(zustand)"
import { Chat } from "./(chat)/components"
import { Details } from "./(details)/components"
import { List } from "./(list)/components"

export const ChatApp = () => {
  const { chatId } = chatStore();

  return (
    <>
        <List />
        {/* <Chat /> 
        <Details />  */}
        { chatId && <Chat /> }
        { chatId && <Details /> }
    </>
  )
}

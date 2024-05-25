import { Chat } from "./(chat)/components"
import { Details } from "./(details)/components"
import { List } from "./(list)/components"

export const ChatApp = () => {
  return (
    <>
        <List />
        <Chat />
        <Details />
    </>
  )
}

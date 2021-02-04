
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Answer from "./components/Answer";
import Submit from "./components/Submit";
import Item from "./components/Item";
import ListItems from "./components/ListItems";
import Account from "./components/Account";

export default function App() {
  return (
    <div >
      <Navigation />
      <Login />
      <SignUp />
      <Answer />
      <Submit />
      <Item/>
      <ListItems />
      <Account />
    </div>
  );
}



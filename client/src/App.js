import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import AnswerApp from "./components/User/Answer/AnswerApp";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import Form3 from "./components/User/SignUp/Form3";
import Submit from "./components/User/Submit";
import Answer from "./components/User/Answer/Answer";
import AnswerGuess from "./components/User/Answer/AnswerGuess";
import Account from "./components/User/Account";
import ListItems from "./components/User/ListItems";
import Topics from "./components/Admin/Topics";
import TopicShow from "./components/Admin/TopicShow";
import ItemShow from "./components/User/ItemShow";
import MyScore from "./components/User/Answer/MyScore";
import Items from "./components/Admin/Items";
import Users from "./components/Admin/Users";
import ItemsApprove from "./components/Admin/ItemsApprove";
import SubmittedItems from "./components/User/SubmittedItems";
import "./App.css";
import { decoder } from "./decode";
//import users from '../../server/src/routes/users';
//import Account from './components/Account';

export default function App() {
  const userLocalStorage = decoder() || {};

  /*const adminUser = {
    email : 'test@test.com',
    password : 'test'
  }
*/
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(userLocalStorage.user || { id: 1 });
  const [change, setChange] = useState(true);

  // localStorage.setItem("token",res.data.token)

  // useEffect(() => {
  //   localStorage.setItem("token",user)
  // },[user])

  //const userInStorage = useState(localStorage.getItem("user"));
  //const [user, setUser] = useState(userInStorage ? userInStorage : null);
  // useEffect(() => {
  //   const localUser = localStorage.getItem("user")
  //   console.log("LocalUser",localUser)
  //   setUser(localUser)
  // }, [])
  // useEffect(() => {
  //   localStorage.setItem("user", user)
  // }, [user])
  const [topics, setTopics] = useState([]);
  /*
  const chooseTopics = topics => {
    axios.post("http://localhost:8001/topics",{ 
        topic: topics.topic
  })
  .then( res =>
    {
        console.log(res.data);
        setTopics([...topic]);
    }
    )
  }
  const generateRandomTopics = () => {
    let arrayTopicIds =[];
    for (const i = 0 ; i <4 ; i++) {
        arrayTopicIds.push (Math.floor(Math.random() * 10));
    }
    return arrayTopicIds;
}
*/
  const [currentItem, setCurrentItem] = useState({});
  const [itemsOfTopic, setItemsOfTopic] = useState([]);
  const [items, setItems] = useState([]);
  const [currentTopic, setCurrentTopic] = useState({ topic_id: 1 });
  const [itemsToApprove, setItemsToApprove] = useState([]);
  const [submittedItems, setSubmittedItems] = useState([]);
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/topics"),
      axios.post("http://localhost:8001/", {
        email: user.email,
        type: user.type,
      }),
      axios.get("http://localhost:8001/itemstoapprove"),
      axios.get(`http://localhost:8001/itemsoftopic/${currentTopic.topic_id}`),
      axios.get(`http://localhost:8001/submitteditems/${user.id}`),
    ]).then((all) => {
      //console.log("topics",all[0].data)
      //console.log("items",all[1].data)
      //console.log("items to approve",all[2].data)
      setTopics(all[0].data);
      setItems(all[1].data);
      setItemsToApprove(all[2].data);
      setItemsOfTopic(all[3].data);
      setSubmittedItems(all[4].data);
    });
  }, [user, change]);

  //   useEffect(() => {
  //   const newUser = decoder();
  //   if(newUser){
  //     setUser(newUser.user);
  //   }
  //   setChange(!change);

  // },[])

  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);

  let history = useHistory();

  const loginGF = (details) => {
    axios
      .post("http://localhost:8001/logingf", {
        email: details.email,
        name: details.name,
        last_name: details.last_name,
        profile_pic: details.profile_pic,
      })
      .then((res) => {
        console.log("details in function login", details);
        console.log("login res data", res.data);
        localStorage.setItem("token", res.data.token);
        const newUser = decoder();
        setError(null);
        console.log("newUser", newUser.user);
        setUser(newUser.user);
        setChange(!change);
      });
  };
  const logout = () => {
    console.log("Logout");
    localStorage.setItem("token", "");
    setUser({ id: 1 });
  };
  const signup = (details) => {
    return axios
      .post("http://localhost:8001/signup", {
        name: details.name,
        last_name: details.last_name,
        birth_date: details.birth_date,
        gender: details.gender,
        email: details.email,
        password: details.password,
        profile_pic: "",
        country: details.country,
        region: details.region,
        city: details.city,
        relationship: details.relationship,
      })
      .then((res) => {
        console.log("result in signup function", res.data);
        if (!res.data.auth) {
          setError(res.data.message);
        } else {
          localStorage.setItem("token", res.data.token);
          const newUser = decoder();
          setError(null);
          console.log("newUser", newUser.user);
          setUser(newUser.user);
          setChange(!change);
        }
        //return res.data;
      });
  };

  const signupGF = (details) => {
    return axios
      .post("http://localhost:8001/signupgf", {
        name: details.name,
        last_name: details.last_name,
        birth_date: details.birth_date,
        gender: details.gender,
        email: details.email,
        profile_pic: details.profile_pic,
        country: details.country,
        city: details.city,
        relationship: details.relationship,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const newUser = decoder();
        setError(null);
        console.log("newUser", newUser.user);
        setUser(newUser.user);
        setChange(!change);
      });
  };

  const addFavTopic = (user_id, topic_id) => {
    console.log("user and topic".user_id, topic_id);
    axios
      .post("http://localhost:8001/favtopics", {
        user_id: user_id,
        topic_id: topic_id,
      })
      .then((res) => {
        console.log("Favtopic added", res.data);
      });
    setChange(!change);
  };
  const update = (userDeatails, email) => {
    axios
      .post("http://localhost:8001/update", {
        name: userDeatails.name,
        last_name: userDeatails.last_name,
        birth_date: userDeatails.birth_date,
        gender: userDeatails.gender,
        profile_pic: userDeatails.profile_pic,
        country: userDeatails.country,
        region: userDeatails.region,
        city: userDeatails.city,
        relationship: userDeatails.relationship,
        family: userDeatails.family,
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        setError(e);
      });
  };

  const getNbAnsByOption = (item) => {
    return axios
      .post("http://localhost:8001/answer", { item: item })
      .then((res) => {
        console.log("my res is", res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Admin functions

  const showItemsByTopic = (id) => {
    console.log("id in the function", id);
    axios.get(`http://localhost:8001/itemsoftopic/${id}`).then((res) => {
      //console.log("items",res.data)
      setItemsOfTopic(res.data);
      setChange(!change);
      return res.data;
    });
  };

  const addTopic = (topic) => {
    axios
      .post("http://localhost:8001/addtopic", { topic: topic })
      .then((res) => {
        topics.push(res.data);
        setChange("add topic");
        return res.data;
      });
  };

  const addItem = (item, topic, approved) => {
    const time = new Date();
    axios
      .post("http://localhost:8001/items", {
        creator: user.id,
        item: item,
        time: time,
        approved: approved,
        topics: topic,
      })
      .then((res) => {
        console.log("item added", res.data);
        items.push(res.data);
        setChange(!change);
        return res.data;
      });
  };
  const deleteTopic = (id) => {
    axios.delete(`http://localhost:8001/deletetopic/${id}`).then(() => {
      console.log("topic deleted");
      setChange(!change);
    });
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:8001/deleteitem/${id}`).then(() => {
      console.log("item deleted");
      setChange(!change);
    });
  };

  const submitItem = (submittedItem, approved) => {
    const re = /#([a-zA-Z0-9])+/gm;
    let submittedTopics = [];
    let matches = [];
    let topic = "";
    let item = submittedItem;
    while ((matches = re.exec(submittedItem))) {
      console.log(matches);
      topic = matches[0].replace("#", "");
      submittedTopics.push(topic);
      console.log("topic", topic);
      item = item.replace(matches[0], "").trimEnd();
      console.log("item", item);
    }
    let time = new Date();
    axios
      .post("http://localhost:8001/items", {
        creator: user.id,
        item: item,
        time: time,
        approved: approved,
        topics: submittedTopics,
      })
      .then((res) => {
        console.log("submittedItem", res.data);
        setChange(!change);
      });
  };
  const approveItem = (id) => {
    axios.get(`http://localhost:8001/approveitem/${id}`).then((res) => {
      setChange(!change);
      console.log("item approved", res.data);
      return res.data;
    });
  };

  const showUsers = () => {
    axios.get("http://localhost:8001/users").then((res) => {
      setUsers(res.data);
    });
  };

  return (
    <div>
      <Router>
        <header>
          <Navigation user={user} logout={logout} showUsers={showUsers} />
        </header>
        <div className="cnt">
          <Switch>
            <Route path="/login">
              {!user.email && (
                <Login
                  change={change}
                  setChange={setChange}
                  setUser={setUser}
                  setError={setError}
                  loginGF={loginGF}
                  user={user}
                  error={error}
                />
              )}
            </Route>
            <Route path="/signup">
              <SignUp
                signup={signup}
                error={error}
                topics={topics}
                userId={user.id}
                addFavTopic={addFavTopic}
                loginGF={loginGF}
                signupGF={signupGF}
              />
            </Route>
            <Route path="/signup3">
              <Form3 user={user} />
            </Route>
            <Route path="/" exact>
              {user.type !== "super" && (
                <ListItems
                  email={user.email}
                  items={items}
                  setCurrentItem={setCurrentItem}
                  topics={topics}
                />
              )}
            </Route>

            <Route path="/answer">
              <Answer
                items={items}
                item={currentItem}
                setCurrentItem={setCurrentItem}
                getNbAnsByOption={getNbAnsByOption}
                topics={topics}
                user={user}
              />
            </Route>
            <Route path="/answerguess">
              <AnswerGuess
                items={items}
                item={currentItem}
                setCurrentItem={setCurrentItem}
                getNbAnsByOption={getNbAnsByOption}
                topics={topics}
                user={user}
              />
            </Route>
            <Route path="/MyScore">
              <MyScore item={currentItem} user={user} />
              <MyScore />
            </Route>
            <Route path="/submit">
              <Submit change={change} setChange={setChange} user={user} />
            </Route>
            <Route path="/account">
              <Account update={update} error={error} user={user} />
            </Route>
            <Route path="/topics">
              <Topics
                topics={topics}
                setCurrentTopic={setCurrentTopic}
                showItemsByTopic={showItemsByTopic}
                addTopic={addTopic}
                deleteTopic={deleteTopic}
              />
            </Route>
            <Route path="/topicShow">
              <TopicShow
                currentTopic={currentTopic}
                items={itemsOfTopic}
                setCurrentItem={setCurrentItem}
                addItem={addItem}
                deleteItem={deleteItem}
              />
            </Route>
            <Route path="/itemShow">
              <ItemShow currentItem={currentItem} />
            </Route>
            <Route path="/items">
              <Items
                items={items}
                setCurrentItem={setCurrentItem}
                submitItem={submitItem}
                deleteItem={deleteItem}
              />
            </Route>
            <Route path="/itemstoapprove">
              <ItemsApprove
                items={itemsToApprove}
                setCurrentItem={setCurrentItem}
                approveItem={approveItem}
                deleteItem={deleteItem}
              />
            </Route>
            <Route path="/myitems">
              <SubmittedItems
                items={submittedItems}
                setCurrentItem={setCurrentItem}
                deleteItem={deleteItem}
              />
            </Route>

            <Route path="/users">
              <Users users={users} />
            </Route>
          </Switch>
        </div>
      </Router>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

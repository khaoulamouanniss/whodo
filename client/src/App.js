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
import PreviousItems from "./components/User/PreviousItems";
import Form3 from "./components/User/SignUp/Form3";
import Submit from "./components/User/Submit";
import Answer from "./components/User/Answer/Answer";
import NewLevel from "./components/User/Answer/NewLevel";
import AnswerGuess from "./components/User/Answer/AnswerGuess";
import Account from "./components/User/Account";
import ListItems from "./components/User/ListItems";
import Topics from "./components/Admin/Topics";
import TopicShow from "./components/Admin/TopicShow";
import ItemShow from "./components/User/ItemShow";

import Items from "./components/Admin/Items";
import Users from "./components/Admin/Users";
import ItemsApprove from "./components/Admin/ItemsApprove";
import SubmittedItems from "./components/User/SubmittedItems";
import "./App.css";
import { decoder } from "./decode";

export default function App() {
  const userLocalStorage = decoder() || {};

  //set the state openedTopics to all unlocked topics

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(userLocalStorage.user || { id: 1 });
  const [change, setChange] = useState(true);

  const [topics, setTopics] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [unlockedTopics, setUnlockedTopics] = useState([]);
  const [itemsOfTopic, setItemsOfTopic] = useState([]);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [handleSearch, setHandleSearch] = useState("");
  const [level, setLevel] = useState(localStorage.getItem("userLevel"));
  const [currentTopic, setCurrentTopic] = useState({ topic_id: 1 });
  const [itemsToApprove, setItemsToApprove] = useState([]);
  const [submittedItems, setSubmittedItems] = useState([]);
  const [previousItems, setPreviousItems] = useState([]);

  useEffect(() => {
    console.log("my new handle search", handleSearch);
  }, [handleSearch]);

  //when the page load, we bring the user level from newLevel route
  useEffect(() => {
    axios
      .post("http://localhost:8001/newLevel", { user: user.id })
      .then((res) => {
        setLevel(res.data);
        localStorage.setItem("userLevel", res.data);
        return res.data;
      });
    axios.post("http://localhost:8001/", {
      id: user.id,
      level: level,
    });
    axios
      .post("http://localhost:8001/previousitems", {
        id: user.id,
        keyWord: handleSearch,
      })
      .then((res) => {
        setPreviousItems(res.data);

        return res.data;
      });
  }, [handleSearch, level]);

  //refresh the list of unlocked topics whenever the level changes
  useEffect(() => {
    axios
      .post("http://localhost:8001/unlockedTopics", {
        level: level,
      })
      .then((res) => {
        setUnlockedTopics(res.data.map((item) => item.topic));
        return res.data;
      });
  }, [level]);
  //when the page is loaded, we get the score of the user from the database
  useEffect(() => {
    axios
      .post("http://localhost:8001/guess/score", {
        user: user.id,
      })
      .then((res) => {
        setScore(res.data);
        localStorage.setItem("userScore", res.data);
        return res.data;
      });
  }, [currentItem]);

  //whenever the page is loaded, we get the topics, the score, the items of all sort, the level
  useEffect(() => {
    Promise.all([
      axios.post("http://localhost:8001/", {
        id: user.id,
        level: level,
      }),
      axios.get("http://localhost:8001/topics"),
      axios.post("http://localhost:8001/guess/score", {
        user: user.id,
      }),
      axios.get("http://localhost:8001/itemstoapprove"),
      axios.get(`http://localhost:8001/itemsoftopic/${currentTopic.topic_id}`),
      axios.get(`http://localhost:8001/submitteditems/${user.id}`),

      axios.post("http://localhost:8001/unlockedTopics", {
        level: level,
      }),
    ]).then((all) => {
      console.log(all);
      //return only the items for opened topics

      setItems(all[0].data);
      console.log("items are", all[0].data);
      setTopics(all[1].data);
      setScore(all[2].data);
      setItemsToApprove(all[3].data);
      setItemsOfTopic(all[4].data);
      setSubmittedItems(all[5].data);

      console.log("unlocked topics are", all[6].data);
      setUnlockedTopics(all[6].data.map((item) => item.topic));
    });
  }, [user, change]);

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
        setChange(!change);
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
        submittedTopic: topic,
        listOfTopics: topics,
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

  const submitItem = (submittedItem, topic, approved) => {
    let time = new Date();
    axios
      .post("http://localhost:8001/items", {
        creator: user.id,
        item: submittedItem,
        time: time,
        approved: approved,
        submittedTopic: topic,
        listOfTopics: topics,
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
      setChange(!change);
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
                  user={user.id}
                  email={user.email}
                  items={items}
                  setCurrentItem={setCurrentItem}
                  unlockedTopics={unlockedTopics}
                  topics={topics}
                />
              )}
            </Route>
            <Route path="/answer">
              <Answer
                items={items}
                score={score}
                item={currentItem}
                setCurrentItem={setCurrentItem}
                unlockedTopics={unlockedTopics}
                getNbAnsByOption={getNbAnsByOption}
                topics={topics}
                user={user}
              />
            </Route>
            <Route path="/newLevel">
              <NewLevel
                items={items}
                score={score}
                item={currentItem}
                setCurrentItem={setCurrentItem}
                unlockedTopics={unlockedTopics}
                getNbAnsByOption={getNbAnsByOption}
                topics={topics}
                user={user}
                level={level}
              />
            </Route>
            <Route path="/answerguess">
              <AnswerGuess
                items={items}
                score={score}
                item={currentItem}
                setCurrentItem={setCurrentItem}
                unlockedTopics={unlockedTopics}
                getNbAnsByOption={getNbAnsByOption}
                topics={topics}
                user={user}
              />
            </Route>
            <Route path="/submit">
              <Submit
                change={change}
                setChange={setChange}
                user={user}
                unlockedTopics={unlockedTopics}
                topics={topics}
              />
            </Route>
            <Route path="/account">
              <Account update={update} error={error} user={user} />
            </Route>
            <Route path="/topics">
              <Topics
                topics={topics}
                setCurrentTopic={setCurrentTopic}
                unlockedTopics={unlockedTopics}
                showItemsByTopic={showItemsByTopic}
                addTopic={addTopic}
                deleteTopic={deleteTopic}
              />
            </Route>
            <Route path="/topicShow">
              <TopicShow
                currentTopic={currentTopic}
                items={itemsOfTopic}
                unlockedTopics={unlockedTopics}
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
                unlockedTopics={unlockedTopics}
                submitItem={submitItem}
                deleteItem={deleteItem}
              />
            </Route>
            <Route path="/itemstoapprove">
              <ItemsApprove
                items={itemsToApprove}
                setCurrentItem={setCurrentItem}
                unlockedTopics={unlockedTopics}
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
            <Route path="/previousitems">
              <PreviousItems
                items={previousItems}
                setHandleSearch={setHandleSearch}
              />
            </Route>{" "}
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

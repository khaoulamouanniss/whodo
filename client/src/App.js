import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navigation from './components/Navigation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Answer from './components/Answer';
import Submit from './components/Submit';
import Account from './components/Account'
//import Item from './components/Item';
import ListItems from './components/ListItems';
//import ListTopics from './components/SignUp/ListTopics';
//import users from '../../server/src/routes/users';
//import Account from './components/Account';

export default function App() {

  /*const adminUser = {
    email : 'test@test.com',
    password : 'test'
  }
*/
const [user, setUser] = useState({
  id:0,
  name: '',
  lastName:'',     
  birthDate: '',
  gender:'',
  email: '',
  password: '',
  profilePic : '',
  country: '',
  region: '',
  city: '',
  referrer: '',
  type: '' || 'anonymous',
  relationship: '',
  family: '' 
})

  const [topics,setTopics] = useState({});
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
    const[currentItem,setCurrentItem] = useState("");
    const[items, setItems] = useState([])
  
  
    useEffect(() => {

      Promise.all([
          axios.get('http://localhost:8001/topics'), 
          axios.get('http://localhost:8001/',{email:user.email,type:user.type}),
        ]
      ).then(all => {
        setTopics(all[0].data);
        setItems(all[1].data);
      })
  
    }, [user]);
  
      
  
  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);
  

  const login = details => {
    axios.post('http://localhost:8001/login',{ email:details.email, password:details.password })
    .then(res =>
      {
       if(res.data === 'Email does not exist' || res.data === 'Password is incorrect') {
            setError ('Informations do not match!');
        } else {
          console.log('details in function login', details)
          console.log('login request data', res.data)
          setError(null);
          setUser(res.data);
          console.log('Logged in');
          console.log(user.email);
         
        }
      })
  };
  const logout = () => {
    console.log('Logout');
    setUser({
      id:0,
      name: '',
      lastName:'',     
      birthDate:Date(),
      gender:'',
      email: '',
      password: '',
      profilePic : '',
      country: '',
      region: '',
      city: '',
      referrer: '',
      type: '',
      relationship: '',
      family: '' 
    });
    <Redirect to="/"></Redirect>
  };

  const signup = details => {
   return axios.post('http://localhost:8001/signup',{ 
      name: details.name, 
      lastName: details.lastName, 
      birthDate: details.birthDate, 
      gender:details.gender, 
      email: details.email, 
      password: details.password, 
      profilePic: details.profilePic, 
      country: details.country, 
      region: details.region, 
      city: details.city, 
      referrer: details.referrer, 
      type: details.type, 
      relationship: details.relationship, 
      family: details.family
    })
    .then(res =>
      {
        console.log(res.data)
        if(res.data === 'An account with this email exist') {
            setError ('An account with this email exist');
        } else {
          console.log(res.data);
          setError(null);
          setUser(res.data);
          console.log('Signed up');
          console.log(user.email)
        }
        return res.data;
      })
  };

 

  const submitItem  = (submittedItem) => {
    const re = /#([a-zA-Z0-9])+/gm
    let submittedTopics = [];
    let matches =[];
    let topic = "";
    let item = submittedItem;
    while (matches = re.exec(submittedItem)) {
      
      topic=matches[0].replace('#','');
      submittedTopics.push(topic);  
      console.log("topic",topic);
      item = item.replace(matches[0],'').trimEnd();  
      console.log("item",item)
    }
   // const submittedTopics = submittedItem instanceof String ? submittedItem.matches(re) : [];
    //submittedTopics = Array.from(submittedTopics); 
    console.log("item",item)
    console.log("submittedTopics",submittedTopics)
   

  //  while ((topics = re.exec(submitteditem)) != null) {
  //   if (topics.index === re.lastIndex) {
  //   re.lastIndex++;
  //   topics.push(topics)
  //   }
  // }
    let time = new Date();
  axios.post("http://localhost:8001/items",{creator:1, item:item, time:time, approved:false, topics:submittedTopics})
  .then(res => {
    console.log("submittedItem",res.data);
  })
 }

 const addFavTopic = (user_id,topic_id) => {
  axios.post("http://localhost:8001/favtopics",{user_id:user_id, topic_id:topic_id})
  .then(res => {
    console.log("Favtopic added",res.data);
  })
 }

  return ( 
  
  <div >  
    <Router>
      <Navigation email={user.email} logout={logout}/>
      
      <Switch>
        <Route path="/login">
          {!user.email && <Login login={login}  error={error}/> }
          
        </Route>
        <Route path="/signup">
          <SignUp signup={signup} error={error} topics={topics} userId={user.id} addFavTopic={addFavTopic}/>
        </Route>
        <Route path="/" exact>
        <ListItems email={user.email} items={items} setCurrentItem={setCurrentItem}/>
       </Route>
       <Route path="/answer">
         <Answer item ={currentItem}/>
       </Route>
       <Route path="/submit">
         <Submit  submitItem ={submitItem}/>
       </Route>
       <Route path="/account">
         <Account signup={signup} error={error} user={user}/>
       </Route> 
      </Switch>
      
    </Router>

 {/*

       <Navigation />   
      
  
      {(user.email !== '') ? (<div>
        <h1> Welcome <span>{user.email}</span></h1>
          <button onClick={Logout}>Logout</button>  
        </div>
          ) : <div>
            <Login login={login} error={error}/> 
            <SignUp signup={signup} error={error} />
            </div>}
            <ListTopics topics={topics} />
            <ListItems email={user.email} items={items} answerItem={answerItem}/>
             */}
    </div>
  );
}



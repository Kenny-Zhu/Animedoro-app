import logo from './logo.svg';
import Title from './components/Title.js'
import ToDo from './components/ToDo.js'
import Timer from './components/Timer.js'
import BreakAnime from './components/breakAnime.js'
import Header from './components/Header.js'
import { useState, useEffect } from 'react'
import './components/css/main.css'
import {db} from './Firebase.js';
import { doc, setDoc, getDoc, collection,getDocs, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import { FirebaseError } from 'firebase/app';
let animeIdList = [];

function App() {
  const uid = localStorage.getItem("uid");

  //  ****************************************** FIREBASE STUFF ******************************************
 

  // ****************************************** FIREBASE STUFF ******************************************


  const [isSignedIn, setIsSignedIn] = useState(false);


  const [taskList, setTaskList] = useState([]);
  const [input, setInput] = useState([]);
  const [animeList, SetAnimeList] = useState([]);


  const defaultStudyTime = 50 * 60;
  const defaultBreakTime = 20 * 60;
  const[time, setTime] = useState(defaultStudyTime);
  const[tinput, setTInput] = useState('');

  
  const [isActive, setIsActive] = useState(false);
  const [breakIsActive, setBreakIsActive] = useState(false);
  const [currentWatching, setCurrentWatching] = useState([]);

  const [episodeCounts, setEpisodeCounts] = useState({});

  const[studying, setStudying] = useState(true);

  const[breakInput, setBreakInput] = useState('');
  const[breakTime, setBreakTime] = useState(defaultBreakTime);


  const handleSubmit = e => {
    e.preventDefault();
    FetchAnime(input);
  }

  const incrementEpisode = (anime) => {

      setEpisodeCounts(prevCounts => {
        const currentCount = prevCounts[anime.mal_id] || 0;
        const maxEpisodes = anime.episodes;
        


        if(currentCount < maxEpisodes) {
          handleIncrementEpisodeFirebase(anime, currentCount + 1);
          return {
            ...prevCounts,
            [anime.mal_id]: currentCount + 1

          }

        }
        else {
          //alert('max episodes reached');
          return prevCounts;
        }

      });
    
    
  };

  const handleIncrementEpisodeFirebase = async (anime, count) => {
    const tempAnimeRef = collection(db, 'users', `${uid}`,'anime');
    const animeDocRef = doc(tempAnimeRef, `${anime.mal_id}`);
    try {await updateDoc((animeDocRef), {
      episodesWatched: count
    }); 
  }
  catch(error) {
    alert(error);
  }
  } 

  const removeEpisode = async (anime) => {

    const tempAnimeRef = collection(db, 'users', `${uid}`,'anime');
    const animeDocRef = doc(tempAnimeRef, `${anime.mal_id}`);
    console.log(animeDocRef);
    setCurrentWatching(currentWatching.filter(show => show.mal_id !== anime.mal_id));
    const collectionRef = collection(db, uid);
    animeIdList = animeIdList.filter(id => id !== `${anime.mal_id}`);
    try {
      await deleteDoc(animeDocRef)
    }
    catch(error) {
      alert(error);
    }

  };

  const handleRemoveItem = (taskName) => {
    setTaskList(taskList.filter(task => task !== taskName));
  }


  const handleAnimeListClick = (anime) => {
    //handles incrementing episode count
    setEpisodeCounts(prevCounts => ({
      ...prevCounts,
      [anime.mal_id]: (prevCounts[anime.mal_id] || 0) + 1,

    }));
    console.log(`clicked ${anime.title}`);
    setInput(`${anime.title}`);
    SetAnimeList([]);
  }

  const handleAddAnime = (anime) => {
    console.log(`clicked plus button`);
    
    
    handleAddAnimeFireBase(anime);
    if(!animeIdList.includes(`${anime.mal_id}`)) {
      console.log(`adding ${anime.title}`)
      setCurrentWatching((prevWatching) => [...prevWatching, anime]);
      animeIdList.push(`${anime.mal_id}`);
      console.log(currentWatching);
    } else {
      //alert('anime already added!');
      console.log('working error')
    }
    console.log(animeIdList);

   
    
    console.log(currentWatching);
    SetAnimeList([]);
    setInput('');
  }

  const handleAddAnimeFireBase = async (anime) => {
    
    
    const currAnimeData = {
      animeData: anime,
      episodesWatched: 0
    }
    const tempAnimeRef = collection(db, 'users', `${uid}`,'anime');
    const animeDocRef = doc(tempAnimeRef, `${anime.mal_id}`);

    
    const docSnap = await getDoc(animeDocRef);
    console.log(docSnap.exists());
    

    if(!docSnap.exists()) {
      
    try {await setDoc(animeDocRef, currAnimeData); 
  }
  catch(error) {
    alert(error);
  }
}
  } 

  const initOnLogin = async() => {
    console.log("uid is " + uid);
    console.log(uid == '');
    const userDocRef = doc(db, 'users', `${uid}`);
    const userDocSnapshot = await getDoc(userDocRef);
    
    
    if(!userDocSnapshot.exists()) {
      await setDoc(userDocRef, {});
    }
    
    

    const collectionRef = collection(db, 'users', `${uid}`,'anime');
    
    animeIdList.length = 0;

    

    getDocs(collectionRef)
    .then((snapshot) => {
        snapshot.docs.forEach((element) => {
          const animeRef = element.data();
          try {
            handleAddAnime(animeRef.animeData);
            
          }
          catch(error) {
            console.log(error)
          }
        setEpisodeCounts(prevCounts => ({
          ...prevCounts,
          [animeRef.animeData.mal_id]: animeRef.episodesWatched
          
        }))
        console.log(currentWatching);
        })
    })

    getDocs(collectionRef)
    .then((snapshot) => {
        console.log(snapshot.docs.data);
    })
    
  }

  const FetchAnime = async (query) => {
    console.log(query);
    const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&order_by=popularity&sort=asc&limit=5`
    ).then(res => res.json());

    SetAnimeList(temp.data);
    console.log(temp);

  }
  
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleTChange = (e) => {
    setTInput(e.target.value);
  };

  const handleTSubmit = (e) => {
    e.preventDefault();
    setTime(tinput * 60);
    
  }

  const handleBreakSubmit = (e) => {
    e.preventDefault();
    setBreakTime(breakInput * 60);
  }

  const handleBreakChange = (e) => {
    setBreakInput(e.target.value);
  };



  const start = isActive ? "Pause" : "Start"
  const breakStart = breakIsActive ? "Pause" : "Start"
  const handleStartClick = (e) => {
    if(isActive) {
      setIsActive(false);
    }
    else {
      setIsActive(true);
    }
  }

  const handleBreakClick = (e) => {
    if(breakIsActive) {
      setBreakIsActive(false);
    }
    else {
      setBreakIsActive(true);
    }
  }
  useEffect(() => {
    let intervalID;
    if(isActive && time > 0){
      
      intervalID = setInterval(() => {
        setTime((time) => time - 1)
        
      }, 1000
      )
    }
    if(time === 0) {
      intervalID = setInterval(() => {
        setIsActive(false);
      }, 300
      )
    }

    return () => {
      clearInterval(intervalID);
    };
  });

  useEffect(() => {
    let intervalID;
    if(breakIsActive && breakTime > 0){
      
      intervalID = setInterval(() => {
        setBreakTime((breakTime) => breakTime - 1)
        console.log("break interval working")
      }, 1000
      )
    }
    if(time === 0) {
      intervalID = setInterval(() => {
        setBreakIsActive(false);
      }, 300
      )
    }

    return () => {
      clearInterval(intervalID);
    };
  });
  useEffect (() => {
    if(isSignedIn && uid != '') {
      initOnLogin();
    }
    else {
      setCurrentWatching([]);
      animeIdList.length = 0;
      setEpisodeCounts({});
    }
  }, [isSignedIn]);

  
  const map = taskList.map(task => <li>{task} <button onClick = {() => handleRemoveItem(task)}>x</button></li>)
  return (
    <div className="App">
      
      <Title
      initOnLogin = {initOnLogin} 
      setIsSignedIn = {setIsSignedIn}/>
      
      <Header 
      setStudying = {setStudying}
      setIsActive = {setIsActive}
      />
      
      
      {(!studying) ? (
        <div className="animePage">
          <Timer handleTChange = {handleBreakChange}
              handleTSubmit = {handleBreakSubmit}
              tInput = {breakInput}
              time = {breakTime}
              handleStartClick= {handleBreakClick}
              start = {breakStart}
              />
      <ToDo handleSubmit = {handleSubmit}
            input = {input}
            handleChange = {handleChange}
            animeList = {animeList}
            handleAnimeListClick = {handleAnimeListClick} 
            handleAddAnime = {handleAddAnime}/>
      
      <BreakAnime 
        currentWatching = {currentWatching}
        episodeCounts = {episodeCounts}
        incrementEpisode = {incrementEpisode}
        removeEpisode = {removeEpisode}
        isSignedIn = {isSignedIn}
        initOnLogin = {initOnLogin}
        />
      <ul className="currentTasks">{map}</ul>
      </div>
      )
      : (
      <div className="studyingPage">
        <Timer handleTChange = {handleTChange}
              handleTSubmit = {handleTSubmit}
              tInput = {tinput}
              time = {time}
              handleStartClick= {handleStartClick}
              start = {start}
              />
      </div>
      )
      }
    </div>
  );
}

export default App;

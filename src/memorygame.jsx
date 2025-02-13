import { useEffect, useState } from "react";
import "./images.css";


let highScore = 0;
function DisplayGame() {
  let loading = false; //state can be calculated based on num of urls so no need to create a seperate state

  const [urls, setImg] = useState([
    {
      link: "",
      title: "",
      id: "",
    },
  ]);

  if (urls.length > 1) {
    loading = true;
  }
  const [flag, setFlag] = useState(false);
  const [previousImages, setPreviousImages] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let flags = false;
    async function getGif(query) {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=zWj4OOUybyP8xoYmYOpivph7HplwFqTQ&q=${query}&limit=12&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
      const response = await fetch(url, { mode: "cors" });
      const json = await response.json();
      const arr = [];
      json.data.forEach((data, index) => {
        let r = {
          link: data.images.original.url,
          title: data.title,
          id: data.id,
        };
        arr.push(r);
      });
      if (flags == false) {
        setImg(arr);
      }
    }
    getGif(query);
    return () => {
      flags = true;
    };
  }, [flag]);

  function shuffle(e) {
    if (!previousImages.includes(e.target.id)) {

      setPreviousImages([...previousImages, e.target.id]);
      console.log("here");
    } else {
      if (previousImages.length > highScore){
        highScore = previousImages.length;
      }
      setPreviousImages([]);
    }

    console.log(e.target.id);
    let currentIndex = urls.length;
    let array = [...urls]; // Create a copy of the array
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    console.log("SETTING");
    setImg(array);
  }


  function sendName(e){
    console.log(e.target.value)
    setQuery(e.target.value)
  }
  function startGame(){
    setFlag(true);
  }

  return (
    <div>

      {flag ? <ShowGame 
      name={query}
      loading={loading} 
      urls={urls} 
      previousImages={previousImages} 
      highScore={highScore}
      shuffle={shuffle} />
      : <Start sendName={sendName} startGame={startGame}/> }

    </div>
  );
}
function Start({sendName, startGame}){
return (
  <div className="search">
  <h2>Memory Game!</h2>
  <p>Type the name of the gifs you would like to play with.</p>
  <label htmlFor="search"></label>
  <input onChange={sendName} type="text" />
  <button onClick={startGame}>Sumbit</button>
</div>

)}
function ShowGame({name, loading, urls, previousImages, highScore, shuffle}){
return <>
      <h2>{name} Memory Game</h2>
      <p className="score">Score: {previousImages.length}</p>
<p className="score">High Score: {highScore}</p>
<div className="container">
  {loading ? (
    urls.map((url) => {
      return (
        <div
          className="imgCard"
          key={url.id}
          id={url.id}
          onClick={shuffle}
        >
          <img src={url.link} id={url.id} />
          <p id={url.id}>{url.title}</p>
        </div>
      );
    })
  ) : (
    <h2>"Loading..."</h2>
  )}
</div>
</>
}
export default DisplayGame;

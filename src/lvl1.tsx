import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
export default function Lvl1() {
  const nav = useNavigate();

  const words = ["fun", "bun", "gag", "taz"];
  const [aWord, setAWord] = useState([""]);
  const [correctWord, SetCorrectWord] = useState([""]);
  const merged = words.join("");

  const ShuffleWord = (word: string) => {
    const characters = word.split("");
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join("");
  };

  const shuffledWord = ShuffleWord(merged);
  const [splitted] = useState(shuffledWord.split(""));

  console.log(aWord);
  const listen = (s: string) => {
    if (aWord.length <= 3) {
      setAWord((aWord) => [s, ...aWord]);
    }
  };
  const validate = () => {
    const wordReversed = aWord.reverse();
    const wordToJoin = wordReversed.join("");

    words.map((e, idx) => {
      if (e === wordToJoin) {
        words.splice(idx, 1);
        console.log(e);
        SetCorrectWord((correctWord) => [e, ...correctWord]);
        setAWord([""]);
      } else {
        setAWord([""]);
      }
    });
    if (words.length == correctWord.length - 1) {
      alert("all words found");
      nav("/lvl2");
    }
  };

  return (
    <>
      <div className="main">
        <div className="title">find the words</div>
        <div className="word-container">
          <div className="placeHolder-word">{correctWord[2]}</div>
          <div className="placeHolder-word">{correctWord[0]}</div>
          <div className="placeHolder-word">{correctWord[1]}</div>
          <div className="placeHolder-word">{correctWord[3]}</div>
        </div>
        <div className="letters">
          {splitted.map((e, key) => {
            return (
              <div className="" key={key}>
                <div onClick={() => listen(e)} className="lt">
                  {e.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>

        <div className="placement-container">
          <div className="letter-placment">{aWord[2]}</div>
          <div className="letter-placment">{aWord[1]}</div>
          <div className="letter-placment">{aWord[0]}</div>
          <button onClick={validate}>validate</button>
        </div>
      </div>
    </>
  );
}

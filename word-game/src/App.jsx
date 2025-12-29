import { useRef, useState ,useEffect } from "react";

export default function FiveLetterInput() {
  const [values, setValues] = useState(["", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [Chances, setChances] = useState(100);
  const [Word, setWord] = useState("");
  const [GameState, setGameState] = useState("");

  const list = [
    "APPLE","BRAVE","CHAIR","DREAM","EAGLE","FLAME","GRAPE","HOUSE","INDEX","JUICE",
    "KNIFE","LEMON","MONEY","NURSE","OCEAN","PLANT","QUEEN","ROBOT","SNAKE","TABLE",
    "UNITY","VIRUS","WATER","XENON","YEAST","ZEBRA","ANGEL","BREAD","CLOUD","DANCE",
    "EARTH","FRAME","GIANT","HEART","IDEAL","JELLY","KNOCK","LIGHT","MAGIC","NIGHT",
    "OPERA","PEACH","QUIET","RIVER","SMILE","TRAIN","URBAN","VIVID","WHEAT","XENIA",
    "YOUTH","ZONAL","ALERT","BLEND","CANDY","DELTA","ELDER","FAITH","GLASS","HAPPY",
    "IMAGE","JUDGE","KARMA","LASER","METAL","NORTH","ORBIT","PRIDE","QUEST","RANGE",
    "SOLID","TIGER","USAGE","VOTER","WORLD","XEROX","YOUNG","ZESTY","BASIC","CIVIL",
    "DRIVE","ENJOY","FROST","GREEN","HOTEL","INPUT","JOKER","KOALA","LUNCH","AYUSH"
  ];

  useEffect(() => {
    let randomWord = list[Math.floor(Math.random() * list.length)];
    setWord(randomWord);
    setGameState("running");
  }, [GameState]);
  

  const handleChange = (e, index) => {
    const value = e.target.value.toUpperCase();

    if (!/^[A-Z]?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
    else if(e.key==="ArrowLeft"){
      inputsRef.current[index - 1].focus();
    }
  };


  const removeclasslist=()=>{
    for(let i=0;i<5;i++){
      let box=inputsRef.current[i];

      box.classList.remove("spin");
      void box.offsetWidth;
      box.classList.add("spin");

      box.classList.remove("correct");
      box.classList.remove("partial-correct");
    }
  }

  const handlebutton=()=>{
    if(Chances>0){
      setChances((prev)=>prev-1);
      let a=[...values];
      let b=[...Word];

      //win

      if(a.join("")===b.join("")){
        alert("Congratulations You Guessed It Right !!!");
        setChances(5);
        const value=["","","","",""]
        setValues(value);
        setGameState("ended");
        removeclasslist();
        return;
      }

      //correct
      
      for(let i=0;i<5;i++){
        let box=inputsRef.current[i];

        box.classList.remove("spin");
        void box.offsetWidth;
        box.classList.add("spin");

        if(a[i]===b[i]){
          box.classList.add("correct");
          box.classList.remove("partial-correct");
          b[i]='';
        }else{
          box.classList.remove("partial-correct");
          box.classList.remove("correct");
        }
      }

      //partial-correct

      for(let i=0;i<5;i++){
        let box=inputsRef.current[i];

        box.classList.remove("spin");
        void box.offsetWidth;
        box.classList.add("spin");

        for(let j=0;j<5;j++){
          if(a[i]===b[j] && j!=i){
            box.classList.add("partial-correct");
            box.classList.remove("correct");
            b[j]='';
          }
        }
      }
    }

    //loose


    else{
      setChances(5);
      alert("You Are Out Of Moves "+` \nCorrect Word is ${Word}`);
      const value=["","","","",""];
      setValues(value);
      setGameState("ended");
      removeclasslist();
      return;
    }
  };



  return (
    <div className="container">
      <div className="chances">
        Chances Left : {Chances}
      </div>
      <div className="word-box">
        <form onSubmit={(e)=>{
          e.preventDefault();
        }}>
          {values.map((val, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
          <button type="submit" onClick={handlebutton}>Check</button>
        </form>
      </div>
    </div>
  );
}
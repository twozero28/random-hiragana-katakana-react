import React, { useEffect, useState } from "react";
import { Mode } from "../model/mode";
import { Character, hiraganas, katakanas } from "../lib/character-data";
import { getRandomElement } from "../lib/utils";

const getRandomHiraKana = (character: string): Character => {
  if (character === "hiragana") {
    return getRandomElement([...hiraganas]);
  } else if (character === "katakana") {
    return getRandomElement([...katakanas]);
  } else {
    return getRandomElement([...hiraganas, ...katakanas]);
  }
};

interface Props extends Mode {}
const Start = ({ isAuto, time, character }: Props) => {
  const [randomCharacter, setRandomCharacter] = useState<Character>(() =>
    getRandomHiraKana(character)
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number[]>([]);

  useEffect(() => {
    if (isAuto && showAnswer) {
      const localTimeoutId = setTimeout(() => {
        setShowAnswer(false);
        setRandomCharacter(getRandomHiraKana(character));
      }, 1000);
      setTimeoutId([...timeoutId, localTimeoutId]);
    } else if (isAuto && !showAnswer) {
      const localTimeoutId = setTimeout(() => {
        setShowAnswer(true);
      }, time * 1000);
      setTimeoutId([...timeoutId, localTimeoutId]);
    } else {
      timeoutId.forEach((id) => clearTimeout(id));
    }
  }, [showAnswer, isAuto]);

  return (
    <div>
      <h1>{randomCharacter.problem}</h1>
      {showAnswer && <p>{randomCharacter.answer}</p>}
    </div>
  );
};

export default Start;

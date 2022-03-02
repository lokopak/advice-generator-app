import { useEffect, useState } from "react";
import "./Advice.css";

const API = "https://api.adviceslip.com/advice";

const randomAdvice = async () => {
  return await fetch(API, {
    method: "GET",
    mode: "cors",
  })
    .then((result) => result.json())
    .then((result) => result.slip)
    .catch(() => {
      return { id: -1, advice: "Failed to get advice." };
    });
};

export function Advice() {
  const [slip, setSlip] = useState({ id: -1, advice: "Unable to get advice" });
  const [loading, setLoading] = useState(false);

  const getSlip = () => {
    setLoading(true);
    randomAdvice().then((slip) => {
      setSlip(slip);
      setLoading(false);
    });
  };

  useEffect(getSlip, []);

  return (
    <div className={"advice"}>
      <h3 className={"title"}>Advice #{slip.id}</h3>
      <blockquote className={`quoted ${loading ? "loading" : ""}`}>
        &quot;<span>{slip.advice}</span>&quot;
      </blockquote>
      <div className={"pattern"}></div>
      <button type="button" onClick={getSlip}>
        <i className={"icon-dice"}>
          <img src="/images/icon-dice.svg" alt="" />
        </i>
      </button>
    </div>
  );
}

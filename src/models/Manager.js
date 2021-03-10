import Question from "./Question";

export const getQuestions = async (num = 1) => {
  // TODO: use session token
  let response = await fetch(`https://opentdb.com/api.php?amount=${num}&type=multiple&encode=url3986`);
  let data = await response.json();
  return data.results.map(d => new Question(d))
}

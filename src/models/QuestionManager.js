import Question from "./Question";

const DEFAULT_QUESTIONS = 10;

export default class QuestionManager {
  constructor() {
    this.questions = [];
    this.current = null;
    this.sessionToken = null;
    this.populateQuestions();
  }

  reset() {
    this.questions = [];
    this.current = null;
    this.populateQuestions();
  }

  setCurrent(i) {
    this.current = this.questions[i];
  }

  async populateQuestions() {
    if (!this.sessionToken) {
      this.sessionToken = await this.getSessionToken();
    }
    this.questions = await this.getQuestions(this.sessionToken, DEFAULT_QUESTIONS);
    console.log(this.questions);
  }

  async apiRequest(params = {}, endpoint = "api.php") {
    const searchParams = new URLSearchParams(params);
    let response = await fetch(`https://opentdb.com/${endpoint}?${searchParams.toString()}`);
    return await response.json();
  }

  async getSessionToken() {
    const response = await this.apiRequest({ command: "request" }, "api_token.php");
    return response.token;
  }

  async getQuestions(token = null, num = 1) {
    const query = { "amount": num, "encode": "url3986", "type": "multiple" };

    if (token) {
      query["token"] = token;
    }

    const response = await this.apiRequest(query);
    return response.results.map(d => new Question(d));
  }
}

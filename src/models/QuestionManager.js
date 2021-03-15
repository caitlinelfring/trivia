import Question from "./Question";

const DEFAULT_QUESTIONS = 10;

export default class QuestionManager {
  constructor() {
    this.questions = [];
    this.categories = [];
    this.current = null;
    this.sessionToken = null;
    this.selectedCategory = null;
  }

  async reset() {
    this.questions = [];
    this.current = null;
    await this.populateQuestions();
  }

  setCurrent(i) {
    this.current = this.questions[i];
  }

  async populateQuestions() {
    if (!this.sessionToken) {
      this.sessionToken = await this.getSessionToken();
    }
    this.questions = await this.getQuestions(this.selectedCategory, this.sessionToken, DEFAULT_QUESTIONS);
    console.log(`got questions: ${JSON.stringify(this.questions)}`);
  }

  async populateCategories() {
    this.categories = await this.getCategories();
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

  async getQuestions(category = null, token = null, num = 1) {
    const query = { "amount": num, "encode": "url3986", "type": "multiple" };

    if (token) {
      query["token"] = token;
    }

    if (category) {
      query["category"] = category;
    }

    const response = await this.apiRequest(query);
    return response.results.map(d => new Question(d));
  }

  async getCategories() {
    const response = await this.apiRequest({}, "api_category.php");
    return response.trivia_categories; //.reduce((a, x) => ({ ...a, [x.id]: x.name }), {0: "All"});
  }
}

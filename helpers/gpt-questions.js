import axios from "axios";
import { gptConfig } from "./gpt-credentials";

export async function fetchOpenAiQuestions (category, difficulty, reportedQuestions, count) {
    try {
        let response = await axios.get(gptConfig.endpoint, {params: {difficulty: difficulty, count: count, topic: category, reportedQuestions: reportedQuestions}});
        console.log(response);
        return response.data;

    } catch(error) {
        console.error(error);
    }
}
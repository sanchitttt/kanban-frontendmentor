const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAPI_API_KEY
});
const openai = new OpenAIApi(configuration);


async function getChatGptResponse(prompt) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "system", content: `
        You are an AI which helps individuals or organizations in scheduling and planning their goals. 
        If this prompt=${prompt}  is bad or not readable or not in proper english or not suitable or cant be used for generation of a plan then return a JSON in the format describing what could be improved {
            "error" : The error message
        } else ignore this message

        I will give you prompt on what my goal is and you need to generate a JSON on the basis of this typescript interface : 
interface Subtask {
  title: string,
  isCompleted: boolean
}

interface Task {
  title: string,
  description: string | "",
  status: string,
  subtasks?: Subtask[]
}


interface Columns {
  name: string,
  tasks: Task[]
}

interface Board {
  name: string,
  columns: Columns[]
}

Create a single board and return JSON in the format I specified above

Okay so the prompt is "${prompt}"

(I also need you to generate columns like doing and done with no tasks next time if I give you a prompt. NOTE that the column names can differ on the basis of the prompt)

Try to keep titles concise and short. In board names mentioning 'Board' is redundant.

(NOTE : Only return stringified JSON. Do not return any other text)

        `}],
  });
  if (completion.data.choices[0].message.content.error) {
    throw completion.data.choices[0].message.content.error;
  }
  return completion.data.choices[0].message.content
}

module.exports = { getChatGptResponse }


import { connectToDB } from "@utils/database";
import Prompt from "@models/models";

export const POST = async (request, response) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ 
      creator: userId, 
      prompt,
      tag
    })

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201
    })
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new prompt", {
      status: 500
    })
  }
}
import { connectToDB } from "@utils/database";
import Prompt from "@models/models";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find( {} )
      .populate('creator')
      .sort({ createdAt: 1 });

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", {
      status: 500
    })
  }
}
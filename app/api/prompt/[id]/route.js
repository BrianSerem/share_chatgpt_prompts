import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (requets, { params }) => {

    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) {
            return new Response('Prompt not found', {
                status: 404
            })
        }

        return new Response(
         JSON.stringify(prompt), {
            status: '200'
         }
        )

    } catch (error) {
        return new Response('Failed to fetch prompt', {
            status: 500})
    }

}

export const PATCH = async (request, { params }) => {
    const {prompt, tag} = await request.json()

    try {
        await connectToDB()

        // Find the prompt we want to edit
        const existingPrompt = await Prompt.findById(params.id);

        //If not found
        if(!existingPrompt){
            return new Response('Prompt not found', {
                status: '404'
            })
        }
        // Found prompt we want to edit
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), {
            statu: 200
        })

    } catch(error) {
       return new Response('Failed to update prompt', {
        status: 500
       })
    }
}

export const DELETE = async (request, { params } )=> {
   try{
    await connectToDB()

    //Find the prompt we want to delete
    const prompt = await Prompt.findById(params.id);

    //Not found
    if(!prompt){
        return new Response('Prompt not found', {
            status: 404
        })
    }
    //Found
    await Prompt.findByIdAndRemove({
        _id: params.id
    })
    return new Response('Prompt has been successfully deleted', {
        status: 200
    })
   } catch(error){
    return new Response('Failed to delete the prompt', {
        status: 500
    })
   }
}


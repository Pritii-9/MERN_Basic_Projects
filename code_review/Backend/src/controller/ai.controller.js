import aiService from "../services/ai.service.js";
export async function getReview(req, res) {
    const { code } = req.body; // Extract code from JSON body
    if (!code) {
        return res.status(400).send("Please provide the code in the request body");
    }

    try {
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        console.error("Error occurred:", error); // Log the error
        res.status(500).send("An error occurred while processing your request.");
    }
}

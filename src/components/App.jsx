import React, { useState } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';
import DivGrid from "./DivGrid";




const App = () => {
    const [category, setCategory] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [finResults, setFinResults] = useState([]); // Create state for finResults
    // category mapping
    const categoryMap = {
        movies: "movie",
        music: "music",
        books: "book",
        musician: "musician",
    }

    // model logic starts here
    const apikey = process.env.GEMINI_API;
    const genAI = new GoogleGenerativeAI(apikey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

    const getSimilarVibes = async (categoryActor, categoryActorName) => {
        const prompt = `If I like the ${categoryActor} ${categoryActorName}, give me a list of 20 similar ${categoryActor}s I might like without description - just the titles of the ${categoryActor}s only!`;
        const response = await model.generateContent(prompt);
        // console.log(response.response.candidates[0].content.parts[0].text);//.parts[0].text); // Log the response

        const responseText = response.response.candidates[0].content.parts[0].text; // Get the response text
        const list = responseText.match(/(\d+)\.\s+(.*?)(?=\n|$)/g); // Match numbered items

        const moviesArray = list ? list.map(item => item.replace(/^\d+\.\s+/, '')) : []; // Convert to array
        // console.log(moviesArray); // Log the array of movies
        setFinResults(moviesArray);

        // Assuming the response is a JSON string, parse it
        /*try {
            const parsedResponse = JSON.parse(response); // Parse the response to an object
            // Extract the relevant text from the response
            if (parsedResponse) {
                finResults = parsedResponse.text; // Return the text of the first candidate
                console.log(finResults); // Log the text of the first candidate
                return finResults;
            } else {
                throw new Error("No candidates found in the response.");
            }
        } catch (error) {
            console.error("Error parsing response:", error);
            throw new Error("Failed to parse response");
        }*/
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        if (category) {
            const categoryActor = categoryMap[category];
            getSimilarVibes(categoryActor, inputValue);
            setCategory("");
            setInputValue("");
        } else {
            alert("Please select a category");
        }
    }

    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#121212",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
        }}
        >
        <h1 style={{ marginBottom: 20 }}>VibeMatch</h1>
        <select
            value={category}
            onChange={handleCategoryChange}
            style={{
            padding: 10,
            fontSize: 16,
            marginBottom: 10,
            borderRadius: 5,
            }}
        >
            <option value="">Select a category</option>
            <option value="music">Music</option>
            <option value="movies">Movies</option>
            <option value="books">Books</option>
            <option value="musician">Musician</option>
        </select>
        <input
            type="text"
            placeholder="Enter name of movie, music, or book"
            value={inputValue}
            onChange={handleInputChange}
            style={{
            padding: 10,
            fontSize: 16,
            marginBottom: 20,
            borderRadius: 5,
            }}
        />
        <button
            onClick={handleSearch}
            style={{
            padding: "10px 20px",
            fontSize: 16,
            borderRadius: 5,
            backgroundColor: "#ff4500",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            }}
        >
            Search
        </button>
        <DivGrid items={finResults} />
        </div>
    );
    };

export default App;
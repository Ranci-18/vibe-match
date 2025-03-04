import React, { useState } from "react";
import DivGrid from "./DivGrid";
import '../sass/app.sass';

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
    const baseUrl = 'https://e7a0-2001-41d0-403-e5b-00.ngrok-free.app/api/get-similar-vibes';
    // console.log(baseUrl);

    const getSimilarVibes = async (categoryActor, categoryActorName) => {
        try {
	    const url = `${baseUrl}?categoryActor=${encodeURIComponent(categoryActor)}&categoryActorName=${encodeURIComponent(categoryActorName)}`
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },
            });

            // const textResponse = await response.text();
            // console.log(textResponse);

            // console.log(process.env.API_ENDPOINT);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            // const data = JSON.parse(textResponse);
            const moviesArray = data.data;
            setFinResults(moviesArray);
        } catch (err) {
            console.error("Error:", err);
        }
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
            justifyContent: "flex-start",
            height: "100vh",
            backgroundColor: "#121212",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
        }}
        >
        <h1 style={{ marginBottom: 20 }}>VibeMatch</h1>
        <span style={{marginBottom: "20px"}}>If you like one thing, you're like another one just like it!!</span>
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

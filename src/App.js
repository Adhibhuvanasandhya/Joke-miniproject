import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJoke, fetchCategories } from "./jokeSlice";
import one from "./assests/j2.avif"

function App() {
    const [category, setCategory] = useState("");
    const joke = useSelector((state) => state.joke.joke);
    const error = useSelector((state) => state.joke.error);
    const categories = useSelector((state) => state.joke.categories);

    const dispatch = useDispatch();

    // Fetch categories when the component mounts
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChange = (evt) => {
        setCategory(evt.target.value);
    };

    const handleFetch = () => {
        if (categories.includes(category)) {
            dispatch(fetchJoke(category));
        } else {
            // Dispatch a rejected action manually to update the Redux state
            dispatch({ type: "jokes/jokecategory/rejected", payload: "Invalid category" });
        }
    };

    return (
      <div className=" w-full h-screen bg-cover bg-center bg-no-repeat sm:bg-cover p-8 md:p-16 space-y-6 text-center flex flex-col items-center justify-center" style={{backgroundImage:`url(${one})`}}>
      
      <div className="border border-black rounded-md w-full max-w-lg md:max-w-2xl h-auto p-8 md:p-16 space-y-6">

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">JOKE TIME</h1>
          
          <input
              onChange={handleChange}
              value={category}
              placeholder="Enter joke category"
              className="bg-white w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          
          <button
              onClick={handleFetch}
              className="border border-black rounded-md p-3 w-full bg-white hover:bg-gray-200 transition-all"
          >
              Get Jokes
          </button>

          {/* Show error message */}
          {error && (
              <div className="text-red-600 space-y-2">
                  <p className="text-xl font-semibold">{error}</p>
                  <p className="text-lg md:text-base">
                      Valid categories: 
                      <span className="text-gray-700"> {categories.join(", ")}</span>
                  </p>
              </div>
          )}

          {/* Show the joke */}
          <h1 className="text-lg md:text-2xl  mt-4">{joke}</h1>
      </div>
  </div>
    );
}

export default App;

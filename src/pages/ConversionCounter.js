import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../design/Alert";
import img from "../images/new3.png";

function ConversionCounter() {
  const [options, setOptions] = useState([]);
  const [source, setSource] = useState("USD");
  const [dest, setDest] = useState("INR");
  const [showAlert, setShowAlert] = useState(true);
  const [final, setfinal] = useState("0.0");
  const [amount, setAmount] = useState(0);
  const [countries, setCountries] = useState([]);

  const handleSelectChange = (event) => {
    setShowAlert(true);
    const selectedValue = event.target.value;
    setSource(selectedValue);
    setfinal("0.0");
    console.log("Selected Value:", selectedValue);
  };

  const handleSelectChange1 = (event) => {
    setShowAlert(true);
    const selectedValue = event.target.value;
    setDest(selectedValue);
    setfinal("0.0");
    console.log("Selected Value:", selectedValue);
  };

  const option = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/listquotes",
    headers: {
      "X-RapidAPI-Key": "API_KEY",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  const conversion = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/exchange",
    params: {
      from: source,
      to: dest,
      q: amount,
    },
    headers: {
      "X-RapidAPI-Key": "API_KEY",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  const optionsFixing = async () => {
    try {
      const response = await axios.request(option);
      console.log(response.data);
      setOptions(response.data);
      const countryCodes = response.data;
      const modifiedCountryCodes = countryCodes.map((countryCode) =>
        countryCode.slice(0, -1).toLowerCase()
      );
      setCountries(modifiedCountryCodes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    // console.log("Hello");
    try {
      if (amount == 0 || source == dest) {
        if (amount == 0) alert("Please Enter Amount !!");
        else alert("Source and Destination cannot be Same !! ");
      }
      const response = await axios.request(conversion);
      console.log(response.data);
      setfinal(response.data);
      setShowAlert(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    optionsFixing();
  }, []);

  return (
    <div className="bg-[#1d1f20] lg:grid lg:grid-cols-2 lg:h-[calc(100vh)] items-center justify-between home flex flex-col-reverse mt-5 lg:mt-0 gap-4 lg:gap-0">
      <div className="bg-[#1d1f20] h-[100vh] flex items-center justify-evenly mx-4">
        <div class="w-full max-w-xs bg-[#1d1f20]">
          <form class="px-8 pt-6 pb-8 mb-4 bg-[#1d1f20] rounded-lg shadow-2xl">
            <div class="mb-4">
              <h3 className="text-white font-serif font-bold mb-4">
                Conversion Counter
              </h3>
              <div>
                <label className="text-white font-bold text-lg ">From</label>
                <div className="py-4">
                  <select
                    onChange={handleSelectChange}
                    value={source}
                    className="h-10 w-60"
                  >
                    <option value="">Choose a Country</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white font-bold text-lg">To</label>
                <div className="py-4">
                  <select
                    onChange={handleSelectChange1}
                    value={dest}
                    className="h-10 w-60"
                  >
                    <option value="">Choose a Country</option>
                    {options.map((option, index) => (
                      <option className="">{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="py-4">
                <label
                  for="amount"
                  className="text-white font-bold text-lg py-2"
                >
                  Enter Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  className="py-2 w-60 text-black pl-2"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>

              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Convert
              </button>
            </div>
            {showAlert ? (
              <Alert
                setShowAlert={() => setShowAlert(false)}
                message={"Click on Convert to see the Changes"}
              />
            ) : (
              ""
            )}
          </form>
          <div>
            <p className="font-bold text-white px-2">
              {amount} {source}{" "}
              <img
                className="inline-block"
                src={`https://flagcdn.com/48x36/${source
                  .slice(0, -1)
                  .toLowerCase()}.png`}
                alt="..."
              />{" "}
              = {source == dest ? amount : (final * amount).toFixed(3)} in{" "}
              {dest}{" "}
              <img
                className="inline-block"
                src={`https://flagcdn.com/48x36/${dest
                  .slice(0, -1)
                  .toLowerCase()}.png`}
                alt="..."
              />{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="flex lg:justify-around items-center justify-center">
        <img src={img} className="lg:w-[85%] w-[90%]" />
      </div>
    </div>
  );
}

export default ConversionCounter;

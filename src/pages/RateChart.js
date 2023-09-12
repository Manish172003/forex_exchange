import React, { useEffect, useState } from "react";
import axios from "axios";
import commondata from "../pages/commondata";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Alert from "../design/Alert";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.color = "#f6fff9";
// ChartJS.defaults.font = 2;

const RateChart = () => {
  const [chart, setChart] = useState([]);
  const [date, setDate] = useState("2023-09-11");
  const [showAlert, setShowAlert] = useState(true);
  const [showbtn, setshowBtn] = useState(false);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([
    "AED",
    "AFN",
    "ALL",
    "INR",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTC",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLF",
    "CLP",
    "CNH",
    "CNY",
    "COP",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
  ]);

  const fetchData = async () => {
    const appId = "YOUR_APP_ID";
    const symbols = countries;

    setShowAlert(false);

    axios
      .get(`https://openexchangerates.org/api/historical/${date}.json`, {
        params: {
          app_id: appId,
          symbols: symbols.join(","),
        },
      })
      .then((response) => {
        setChart(Object.entries(response.data.rates));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleProceed = () => {
    if (country) setCountries([country]);
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setCountry(selectedValue);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: ` 📊📈Price of Different Countries with 1 USD on ${date}`,
      },
    },
  };

  const data = {
    labels: chart.map((cn) => cn[0]),
    datasets: [
      {
        label: `Value of the currency on ${date} in Comparison with 1 USD`,
        data: chart.map((cn) => cn[1]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-[#1d1f20]">
      <div className="container  lg:px-28 py-20  md:py-20 sm:py-40 lg:mx-auto min-h-[calc(100vh)]">
        <div className="flex justify-center items-center border-cyan-950">
          <label for="date" className="text-white px-2 font-bold">
            Choose Date :{" "}
          </label>
          <input
            type="date"
            id="surrdate"
            name="currdate"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setShowAlert(true);
            }}
            className="text-black font-bold px-2"
          ></input>
          <button
            className="p-2 m-2 bg-black text-white rounded-lg shadow-lg"
            onClick={() => fetchData()}
          >
            Visualise
          </button>
          <p className="font-serif text-white">Can't find your Country ??</p>
          <button
            className="p-2 m-2 bg-black text-white rounded-lg shadow-lg"
            onClick={() => setshowBtn(!showbtn)}
          >
            {showbtn ? "Close" : "Click Here"}
          </button>
        </div>
        {showbtn && (
          <div className="flex justify-center items-center border-cyan-950">
            <label className="text-white font-bold text-lg px-2">
              Choose Currency
            </label>
            <div className="py-4">
              <select
                className="h-10 w-60"
                value={country}
                onChange={handleSelect}
              >
                <option value="">Choose a Country</option>
                {commondata.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="p-2 m-2 bg-black text-white rounded-lg shadow-lg"
              onClick={handleProceed}
            >
              Proceed
            </button>
          </div>
        )}

        <div></div>
        {showAlert && (
          <Alert message={"Please Click on Visualise to see the Changes"} />
        )}

        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default RateChart;

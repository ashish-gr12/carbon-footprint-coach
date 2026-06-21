import { useState } from "react";
import TransportSection from "../components/calculator/TransportSection";
import FlightsSection from "../components/calculator/FlightsSection";
import ElectricitySection from "../components/calculator/ElectricitySection";
import FuelSection from "../components/calculator/FuelSection";
import NaturalGasSection from "../components/calculator/NaturalGasSection";
import LifestyleSection from "../components/calculator/LifestyleSection";
import {
  calculateEmissions,
} from "../utils/emissionCalculator";
import { useNavigate } from "react-router-dom";
import { saveEmission } from "../services/emissionService";
import { getCurrentUser } from "../services/authService";
import {
  saveLeaderboardEntry,
} from "../services/leaderboardService";

import {
  calculateEcoScore,
  calculateLeaderboardScore,
} from "../utils/leaderboardUtils";

import {
  getProfile,
} from "../services/profileService";

import {
  getEmissionHistory,
} from "../services/emissionService";

function Calculator() {
  const [transport, setTransport] = useState("");
  const [shortFlights, setShortFlights] = useState("");
  const [longFlights, setLongFlights] = useState("");
  const [electricity, setElectricity] = useState("");
  const [fuel, setFuel] = useState("");
  const [gas, setGas] = useState("");
  const [food, setFood] = useState("");
  const [shopping, setShopping] = useState("");
  const [electronics, setElectronics] = useState("");
  const [travelSpend, setTravelSpend] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [fuelType, setFuelType] = useState("petrol");
  const navigate = useNavigate();
  const handleCalculate = async () => {
  if (
    transport === "" &&
    shortFlights === "" &&
    longFlights === "" &&
    electricity === "" &&
    fuel === "" &&
    gas === "" &&
    food === "" &&
    shopping === "" &&
    electronics === "" &&
    travelSpend === ""
  ) {
    alert("Please enter at least one value");
    return;
  }

  if (
    Number(transport) < 0 ||
    Number(shortFlights) < 0 ||
    Number(longFlights) < 0 ||
    Number(electricity) < 0 ||
    Number(fuel) < 0 ||
    Number(gas) < 0 ||
    Number(food) < 0 ||
    Number(shopping) < 0 ||
    Number(electronics) < 0 ||
    Number(travelSpend) < 0
  ) {
    alert("Values cannot be negative");
    return;
  }
  const result = calculateEmissions({
      vehicleType,
      transport,
       
      shortFlights,
      longFlights,
      
      fuelType,
      fuel,

      electricity,
      gas,

      food,
      shopping,
      electronics,
      travelSpend,
    });

    const user = await getCurrentUser();
    const { error } = await saveEmission({
      user_id: user.id,

      vehicle_type: vehicleType,
      transport: result.transport,

      short_flights: result.shortFlights,
      long_flights: result.longFlights,
      flights: result.flights,

      fuel_type: fuelType,
      fuel: result.fuel,

      electricity: result.electricity,
      gas: result.gas,

      food: result.food,
      shopping: result.shopping,
      electronics: result.electronics,
      travel: result.travelSpend,

      total: result.total,
    });
    
    if (error) {
      console.error(error);
      alert("Failed to save emission data");
      return;
    }

    // Load profile

    const { data: profile } =
      await getProfile(user.id);

    // Get history including latest save

    const { data: history } =
      await getEmissionHistory(user.id);

    const totals =
      history?.map(item => item.total) || [];

    const highest =
      Math.max(...totals);

    const latest =
      result.total;

    // Reduction %

    let reduction = 0;

    if (highest > 0) {
      reduction =
        ((highest - latest) / highest) * 100;
    }

    // Eco Score

    const ecoScore =
      calculateEcoScore(latest);

    // Final Score

    const leaderboardScore =
      calculateLeaderboardScore(
        ecoScore,
        reduction
      );

    // Save leaderboard row

    await saveLeaderboardEntry({
      user_id: user.id,

      username:
        profile?.username ||
        "Unknown User",

      eco_score: ecoScore,

      reduction_percentage:
        reduction,

      total_score:
        leaderboardScore,

      total_calculations:
        history?.length || 1,

      updated_at:
        new Date().toISOString(),
    });

    console.log("Leaderboard updated");
    
    navigate("/results", {
      state: result,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Carbon Footprint Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

<TransportSection
  vehicleType={vehicleType}
  setVehicleType={setVehicleType}
  value={transport}
  onChange={setTransport}
/>

<FlightsSection
  shortFlights={shortFlights}
  setShortFlights={setShortFlights}
  longFlights={longFlights}
  setLongFlights={setLongFlights}
/>

        <ElectricitySection
  value={electricity}
  onChange={setElectricity}
/>

<FuelSection
  fuelType={fuelType}
  setFuelType={setFuelType}
  value={fuel}
  onChange={setFuel}
/>

       <NaturalGasSection
  value={gas}
  onChange={setGas}
/>

<LifestyleSection
  food={food}
  setFood={setFood}
  shopping={shopping}
  setShopping={setShopping}
  electronics={electronics}
  setElectronics={setElectronics}
  travelSpend={travelSpend}
  setTravelSpend={setTravelSpend}
/>

        <button
          onClick={handleCalculate}
          className="
          col-span-full
          bg-gradient-to-r
          from-green-600
          to-emerald-500
          text-white
          py-4
          rounded-xl
          font-bold
          text-lg
          shadow-lg
          hover:scale-105
          transition
          "
        >
          Calculate Footprint
        </button>

      </div>

    </div>
  );
}

export default Calculator;
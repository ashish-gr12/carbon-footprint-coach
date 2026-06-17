function FlightsSection({
  shortFlights,
  setShortFlights,
  longFlights,
  setLongFlights,
}) {
  return (
<div className="bg-gradient-to-r from-red-100 to-red-200 border-l-8 border-red-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        ✈️ Flights
      </h2>

      <div className="space-y-4">

        <div>
          <label className="font-semibold">
            Short Flights
          </label>

          <input
            type="number"
            min="0"
            value={shortFlights}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) >= 0) {
                setShortFlights(value);
              }
            }}
            placeholder="Flights under 1500 km"
            className="
            w-full
            border-2
            border-gray-300
            p-3
            rounded-xl
            mt-1
            bg-white
            shadow-sm
            focus:outline-none
            focus:ring-4
            focus:ring-green-200
            focus:border-green-500
            transition
            duration-200
"
          />
        </div>

        <div>
          <label className="font-semibold">
            Long Flights
          </label>

          <input
            type="number"
            min="0"
            value={longFlights}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) >= 0) {
                setLongFlights(value);
              }
            }}
            placeholder="Flights above 1500 km"
            className="
            w-full
            border-2
            border-gray-300
            p-3
            rounded-xl
            mt-1
            bg-white
            shadow-sm
            focus:outline-none
            focus:ring-4
            focus:ring-green-200
            focus:border-green-500
            transition
            duration-200
            "
          />
        </div>

      </div>

    </div>
  );
}

export default FlightsSection;
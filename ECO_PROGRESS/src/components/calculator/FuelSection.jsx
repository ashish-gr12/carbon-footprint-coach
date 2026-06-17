function FuelSection({
  fuelType,
  setFuelType,
  value,
  onChange,
}) {
  return (
<div className="bg-gradient-to-r from-purple-100 to-purple-200 border-l-8 border-purple-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        ⛽ Fuel
      </h2>

      <div className="space-y-4">

        <div>
          <label className="font-semibold">
            Fuel Type
          </label>

          <select
            value={fuelType}
            onChange={(e) =>
              setFuelType(e.target.value)
            }
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
          >
            <option value="petrol">
              Petrol
            </option>

            <option value="diesel">
              Diesel
            </option>
          </select>
        </div>

        <div>
          <label className="font-semibold">
            Fuel Used (Litres/month)
          </label>

          <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) >= 0) {
                onChange(value);
              }
            }}
            placeholder="Enter litres"
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

export default FuelSection;
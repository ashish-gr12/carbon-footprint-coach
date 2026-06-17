function TransportSection({
  vehicleType,
  setVehicleType,
  value,
  onChange,
}) {
  return (
<div className="bg-gradient-to-r from-blue-100 to-blue-200 border-l-8 border-blue-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        🚗 Transportation
      </h2>

      <div className="flex flex-col gap-4">

        <div>
          <label className="font-semibold">
            Vehicle Type
          </label>

          <select
            value={vehicleType}
            onChange={(e) =>
              setVehicleType(e.target.value)
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
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="scooter">Scooter</option>
            <option value="bus">Bus</option>
            <option value="metro">Metro</option>
            <option value="train">Train</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">
            Distance Travelled (km/month)
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
            placeholder="Enter distance"
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

export default TransportSection;
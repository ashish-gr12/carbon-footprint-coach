function ElectricitySection({ value, onChange }) {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-amber-200 border-l-8 border-yellow-600 p-6 rounded-xl shadow-lg">
      <label className="font-semibold">
        Electricity (kWh/month)
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
        placeholder="Enter electricity usage"
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
  );
}

export default ElectricitySection;
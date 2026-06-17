function NaturalGasSection({
  value,
  onChange,
}) {
  return (
<div className="bg-gradient-to-r from-emerald-100 to-green-200 border-l-8 border-emerald-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        🔥 Natural Gas
      </h2>

      <div>
        <label className="font-semibold">
          LPG Cylinders Used (per month)
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
          placeholder="Enter number of LPG cylinders"
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
  );
}

export default NaturalGasSection;
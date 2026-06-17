function LifestyleSection({
  food,
  setFood,
  shopping,
  setShopping,
  electronics,
  setElectronics,
  travelSpend,
  setTravelSpend,
}) {
  return (
<div className="bg-gradient-to-r from-pink-100 to-orange-100 border-l-8 border-pink-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Lifestyle & Consumption
      </h2>

      <div className="space-y-4">

        <div>
          <label className="font-semibold">
            🍔 Food Spending (₹/month)
          </label>

          <input
            type="number"
            min="0"
            value={food}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) >= 0) {
                setFood(value);
              }
            }}
            placeholder="Food expenses"
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
            🛍 Shopping (₹/month)
          </label>

          <input
            type="number"
            min="0"
            value={shopping}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) >= 0) {
                setShopping(value);
              }
            }}
            placeholder="Clothes & shopping"
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
            💻 Electronics (₹/month)
          </label>

          <input
            type="number"
            min="0"
            value={electronics}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) >= 0) {
                setElectronics(value);
              }
            }}
            placeholder="Electronics purchases"
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
            🎫 Travel & Entertainment (₹/month)
          </label>

          <input
            type="number"
            min="0"
            value={travelSpend}
            onChange={(e) => {
            const value = e.target.value;

              if (value === "" || Number(value) >= 0) {
                setTravelSpend(value);
              }
            }}
            placeholder="Travel expenses"
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

export default LifestyleSection;
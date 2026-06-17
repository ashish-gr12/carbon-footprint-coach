export function calculateEmissions(data) {
  const transportFactors = {
    car: 0.171,
    bike: 0.080,
    scooter: 0.070,
    bus: 0.089,
    metro: 0.035,
    train: 0.041,
    };

  const transport =
    Number(data.transport) *
    transportFactors[data.vehicleType];

const shortFlights =
  Number(data.shortFlights) * 250;

const longFlights =
  Number(data.longFlights) * 1100;

const flights =
  shortFlights + longFlights;

  const electricity =
    Number(data.electricity) * 0.82;

const fuelFactors = {
  petrol: 2.31,
  diesel: 2.68,
};

const fuel =
  Number(data.fuel) *
  fuelFactors[data.fuelType];

  const gas =
    Number(data.gas) * 42;

  const food =
  Number(data.food) * 0.0006;

  const shopping =
  Number(data.shopping) * 0.0005;

  const electronics =
  Number(data.electronics) * 0.001;

  const travelSpend =
  Number(data.travelSpend) * 0.0007;

  const total =
    transport +
    flights +
    electricity +
    fuel +
    gas +
    food +
    shopping +
    electronics +
    travelSpend;

  return {
    vehicleType: data.vehicleType,
    transport,
       
    shortFlights,
    longFlights,
    flights,

    fuelType: data.fuelType,
    fuel,
    electricity,
    gas,

    food,
    shopping,
    electronics,
    travelSpend,
    
    total,
  };
}
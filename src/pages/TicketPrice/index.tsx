import MainLayout from "Layout/MainLayout";
import bgImage from "@assets/TicketPrice/bgImage.png";

const TicketPrice = () => {
  const branches = [
    {
      name: "Bashundhara City, Dhaka",
      prices: [
        {
          title: "Hall 1, 2 & 3",
          weekday: ["Premium: 400", "Semi Recliner: 500"],
          weekend: ["Premium: 500", "Semi Recliner: 600"],
        },
        {
          title: "Hall 5 (VIP)",
          weekday: ["VIP: 650"],
          weekend: ["VIP: 850"],
        },
        {
          title: "Hall 6 (Atmos)",
          weekday: ["Premium: 500"],
          weekend: ["Premium: 600"],
        },
      ],
    },
    {
      name: "Shimanto Shambhar, Dhaka",
      prices: [
        {
          title: "Hall 1 & 3",
          weekday: ["Regular: 400", "Premium: 450"],
          weekend: ["Regular: 450", "Premium: 500"],
        },
        {
          title: "Hall 2 (Atmos)",
          weekday: ["Premium: 500"],
          weekend: ["Premium: 600"],
        },
      ],
    },
    {
      name: "SKS Tower, Dhaka",
      prices: [
        {
          title: "Regular Hall",
          weekday: ["Regular: 400", "Semi Recliner: 500"],
          weekend: ["Regular: 500", "Semi Recliner: 600"],
        },
        {
          title: "VIP Hall",
          weekday: ["VIP: 1200"],
          weekend: ["VIP: 1500"],
        },
      ],
    },
  ];

  return (
    <MainLayout>
      <div
        className="min-h-screen bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-black/70 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header */}
            <div className="text-center mb-14">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Ticket Prices
              </h1>
              <p className="text-gray-300 text-sm sm:text-base">
                All prices are in Taka. Weekend includes Friday, Saturday and
                holidays.
              </p>
            </div>

            {/* Branch Cards */}
            <div className="space-y-10">
              {branches.map((branch, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-6">
                    {branch.name}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {branch.prices.map((hall, i) => (
                      <div
                        key={i}
                        className="bg-white/5 rounded-xl p-5 border border-white/10"
                      >
                        <h3 className="font-semibold mb-4 text-lg">
                          {hall.title}
                        </h3>

                        <div className="space-y-3 text-sm text-gray-300">
                          <div>
                            <p className="font-medium text-white">
                              Weekday (Before 3PM)
                            </p>
                            {hall.weekday.map((item, idx) => (
                              <p key={idx}>{item}</p>
                            ))}
                          </div>

                          <div>
                            <p className="font-medium text-white">
                              Weekend / Evening
                            </p>
                            {hall.weekend.map((item, idx) => (
                              <p key={idx}>{item}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition">
                Book Tickets Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TicketPrice;

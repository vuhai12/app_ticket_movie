import { useState } from "react";
import VCB from "@assets/Payment/VCB.png";
import VPB from "@assets/Payment/VPB.png";
import TPB from "@assets/Payment/TPB.png";
import OJB from "@assets/Payment/OJB.png";
import MSB from "@assets/Payment/MSB.png";
import BIDV from "@assets/Payment/BIDV.png";
import GPB from "@assets/Payment/GPB.png";
import VARB from "@assets/Payment/VARB.png";
import HDB from "@assets/Payment/HDB.png";
import Visa from "@assets/Payment/visa-logo.svg";
import Mastercard from "@assets/Payment/Mastercard.svg";
import Maestro from "@assets/Payment/Maestro.svg";
import Paypal from "@assets/Payment/Group.svg";
import MainLayout from "Layout/MainLayout";
import Radio from "@components/Radio";

const dataMethodPayment = [
  {
    id: 1,
    method: "Card",
    image: [Visa, Mastercard, Maestro, Paypal],
  },
  {
    id: 2,
    method: "Mobile Banking",
    image: [Mastercard],
  },
  {
    id: 3,
    method: "Net Banking",
    image: [Maestro],
  },
];

const dataBanking = [
  {
    id: 1,
    image: VCB,
  },
  {
    id: 2,
    image: VPB,
  },
  {
    id: 3,
    image: TPB,
  },
  {
    id: 4,
    image: OJB,
  },
  {
    id: 5,
    image: MSB,
  },
  {
    id: 6,
    image: BIDV,
  },
];

const dataMobileBanking = [
  {
    id: 1,
    image: GPB,
  },
  {
    id: 2,
    image: VARB,
  },
  {
    id: 3,
    image: HDB,
  },
  {
    id: 4,
    image: OJB,
  },
  {
    id: 5,
    image: MSB,
  },
  {
    id: 6,
    image: BIDV,
  },
];

const Payment = () => {
  const [checked, setChecked] = useState("Card");

  return (
    <MainLayout>
      <div className="flex gap-8 lg:flex-row flex-col mt-10 max-w-6xl px-4 mx-auto">
        {/* LEFT */}
        <div className="lg:flex-[3] bg-[#1a0c25] p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold text-white">
            Select Payment Method
          </h3>

          <div className="flex flex-col gap-6 mt-8">
            {dataMethodPayment.map((item) => (
              <div
                key={item.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  checked === item.method
                    ? "border-purple-500 shadow-lg shadow-purple-900/30"
                    : "border-[#38134E]"
                }`}
              >
                <label
                  className={`flex justify-between items-center px-5 py-4 cursor-pointer transition ${
                    checked === item.method
                      ? "bg-gradient-to-r from-purple-700 to-purple-900"
                      : "bg-[#2a123b]"
                  }`}
                >
                  <Radio
                    name="methodsPayment"
                    label={item.method}
                    setChecked={setChecked}
                    checked={item.method === checked}
                  />

                  <div className="flex gap-3 items-center">
                    {item.image.map((img, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-md h-8 px-2 w-14 flex items-center justify-center hover:scale-105 transition"
                      >
                        <img src={img} className="max-h-full object-contain" />
                      </div>
                    ))}
                  </div>
                </label>

                {/* Mobile Banking */}
                {checked === "Mobile Banking" && checked === item.method && (
                  <div className="grid lg:grid-cols-6 grid-cols-3 gap-6 p-6 bg-[#14091c]">
                    {dataMobileBanking.map((bank) => (
                      <div
                        key={bank.id}
                        className="rounded-xl overflow-hidden border border-transparent hover:border-purple-500 transition cursor-pointer hover:scale-105"
                      >
                        <img
                          src={bank.image}
                          className="w-full object-contain bg-white p-2"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Net Banking */}
                {checked === "Net Banking" && checked === item.method && (
                  <div className="grid lg:grid-cols-6 grid-cols-3 gap-6 p-6 bg-[#14091c]">
                    {dataBanking.map((bank) => (
                      <div
                        key={bank.id}
                        className="rounded-xl overflow-hidden border border-transparent hover:border-purple-500 transition cursor-pointer hover:scale-105"
                      >
                        <img
                          src={bank.image}
                          className="w-full object-contain bg-white p-2"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Card */}
                {checked === "Card" && checked === item.method && (
                  <div className="flex flex-col gap-5 text-white p-6 bg-[#14091c]">
                    <input
                      placeholder="Card number"
                      className="p-3 bg-[#1e0d28] rounded-xl border border-[#38134E] focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-700 transition"
                    />
                    <input
                      placeholder="Name on card"
                      className="p-3 bg-[#1e0d28] rounded-xl border border-[#38134E] focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-700 transition"
                    />
                    <div className="flex gap-4 flex-col sm:flex-row">
                      <input
                        placeholder="Expiration date (MM/YY)"
                        className="flex-1 p-3 bg-[#1e0d28] rounded-xl border border-[#38134E] focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-700 transition"
                      />
                      <input
                        placeholder="CVV"
                        className="flex-1 p-3 bg-[#1e0d28] rounded-xl border border-[#38134E] focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-700 transition"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="lg:flex-1 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 py-4 px-6">
            <h3 className="text-lg font-semibold text-white">Summary</h3>
          </div>

          <div className="bg-[#1a0c25] p-6 text-white flex flex-col gap-5 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$120</span>
            </div>

            <div className="flex justify-between">
              <span>Convenience Charge</span>
              <span>$5</span>
            </div>

            <div className="border-t border-[#38134E] pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>$125</span>
            </div>

            <button className="mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:scale-105 transition font-semibold shadow-lg shadow-purple-900/40">
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payment;

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
      <div className="flex gap-[30px] md:flex-row flex-col mt-[30px] max-w-[900px] px-4 mx-auto">
        <div className="flex-[3] bg-[#1e0d28] p-[20px]">
          <h3 className="text-[18px] font-semibold text-white">
            Select Payment Methods
          </h3>
          <div className="flex flex-col gap-[30px] mt-[30px]">
            {dataMethodPayment.map((item) => {
              return (
                <div className=" border-[1px] border-[#38134E] rounded-[10px] flex flex-col overflow-hidden">
                  <label className="flex justify-between bg-[#5f1a89] py-[10px] px-[20px] text-white">
                    <Radio
                      name="methodsPayment"
                      label={item.method}
                      setChecked={setChecked}
                      checked={item.method == checked}
                    />
                    <div className="flex gap-[10px] items-center justify-center">
                      {item.image.map((item) => {
                        return (
                          <div className="bg-white rounded-[5px] h-[30px] px-[5px] w-[50px] flex items-center justify-center">
                            <img src={item} />
                          </div>
                        );
                      })}
                    </div>
                  </label>

                  {checked == "Mobile Banking" && checked == item.method && (
                    <div className="md:grid-cols-6 grid-cols-4 gap-[30px] grid  p-[20px]">
                      {dataMobileBanking.map((item) => {
                        return (
                          <div className="rounded-[10px] overflow-hidden">
                            <img src={item.image} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {checked == "Net Banking" && checked == item.method && (
                    <div className="md:grid-cols-6 grid-cols-4 gap-[30px] grid p-[20px]">
                      {dataBanking.map((item) => {
                        return (
                          <div className="rounded-[10px] overflow-hidden">
                            <img src={item.image} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {checked == "Card" && checked == item.method && (
                    <div className="flex flex-col gap-[20px] text-white p-[20px]">
                      <input
                        placeholder="Card number"
                        className="text-[12px] p-[10px] bg-[#1e0d28] rounded-[10px] border-[1px] border-[#38134E]"
                      />
                      <input
                        placeholder="Name on card"
                        className="text-[12px] p-[10px] bg-[#1e0d28] rounded-[10px] border-[1px] border-[#38134E]"
                      />
                      <div className="flex gap-[20px]">
                        <input
                          placeholder="Expiration date (mm/YY)"
                          className="text-[12px] bg-[#1e0d28] flex-1 p-[10px] rounded-[10px] border-[1px] border-[#38134E]"
                        />
                        <input
                          placeholder="CVV"
                          className="text-[12px] bg-[#1e0d28] flex-1 p-[10px] rounded-[10px] border-[1px] border-[#38134E]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-1 ">
          <div className="bg-[#5f1a89] py-[10px] px-[20px]">
            <h3 className="text-[18px] font-semibold text-white">Summary</h3>
          </div>
          <div className="bg-[#1e0d28] p-[20px] text-white flex flex-col gap-[20px] text-[12px]">
            <p>Subtotal</p>
            <p>Convenience Charge</p>
            <p className="text-[16px] font-semibold">Total amount</p>
            <button className="py-[10px] px-[15px]  rounded-[10px] bg-[#5f1a89] text-white font-semibold">
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payment;

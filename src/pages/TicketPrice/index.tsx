import MainLayout from "Layout/MainLayout";
import bgImage from "@assets/TicketPrice/bgImage.png";
import { useEffect, useState } from "react";

const TicketPrice = () => {
  const [clientWidth, setClientWidth] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      setClientWidth(document.documentElement.clientWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <MainLayout>
      <div
        className=" text-white bg-no-repeat  bg-center  px-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          width: `${clientWidth}px`,
          marginLeft: `calc(-${clientWidth / 2}px + 50%)`,
          backgroundPosition: "80% -500px",
        }}
      >
        <div className="flex lg:flex-row flex-col gap-[30px] container md:px-[50px] px-[10px]">
          <div className="flex-[3] py-[50px]">
            <div className="flex gap-[10px] flex-col break-all">
              <h2 className="text-[25px]">Ticket Price</h2>
              <p>(All prices are in Taka)</p>
              <p>
                You can purchase tickets online and pick them up conveniently
                right before the show from our online counter.
              </p>
              <p>&nbsp;</p>
              <h2>Bashundhara City Shopping Mall, Dhaka</h2>
              <p>&nbsp;</p>
              <h3 className="text-[22px]">Hall 1, Hall 2 &amp; Hall 3</h3>
              <p>
                <br />
                <i>
                  Sunday through Thursday shows starting before 3 PM (except
                  holidays)
                </i>
                <br />
                <strong>Premium seat: 400.00</strong>
                <br />
                <strong>Semi Recliner seat: 500.00</strong>
              </p>
              <p>
                <br />
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>Premium seat: 500.00</strong>
                <br />
                <strong>Semi Recliner seat: 600.00</strong>
              </p>
              <p>&nbsp;</p>
              <h3 className="text-[22px]">Hall 5 (VIP)</h3>
              <p>
                <br />
                <i>
                  Sunday through Thursday shows starting before 3 PM (except
                  holidays)
                </i>
                <br />
                <strong>VIP Seat: 650.00</strong>
              </p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>VIP Seat: 850.00</strong>
                <br />
                <br />
                &nbsp;
              </p>
              <h3 className="text-[22px]">Hall 6 (Atmos)</h3>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday shows starting before 3 PM (except
                  holidays)
                </i>
                <br />
                <strong>Premium Seat: 500.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>Friday &amp; Saturday (holidays and weekday evenings)</i>
                <br />
                <strong>Premium Seat: 600.00</strong>
              </p>
              <div className="h-[2px] w-full bg-white" />
              <p>&nbsp;</p>
              <h2>Shimanto Shambhar, Dhaka</h2>
              <p>&nbsp;</p>
              <h3 className="text-[22px]">Hall 1 &amp; Hall 3</h3>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>Regular seat: 400.00</strong>
                <br />
                <strong>Premium seat: 450.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>Regular seat: 450.00</strong>
                <br />
                <strong>Premium seat: 500.00</strong>
                <br />
                &nbsp;
              </p>
              <h3 className="text-[22px]">Hall 2 (Atmos):</h3>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>Premium Seat: 500.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>Premium Seat: 600.00</strong>&nbsp;
              </p>
              <div className="h-[2px] w-full bg-white" />
              <h2>SKS Tower, Dhaka</h2>
              <p>&nbsp;</p>
              <h3 className="text-[22px]">Hall 1&nbsp;</h3>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>Regular &amp; Lounger seat: 400.00</strong>
                <br />
                <strong>Semi Recliner seat: 500.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>Regular &amp; Lounger seat: 500.00</strong>
                <br />
                <strong>Semi Recliner seat: 600.00</strong>
              </p>
              <h3 className="text-[22px]">
                <br />
                Hall 2 (Atmos)
              </h3>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>Regular &amp; Lounger seat: 500.00</strong>
                <br />
                <strong>Semi Recliner seat: 600.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>Regular &amp; Lounger seat: 600.00</strong>
                <br />
                <strong>Semi Recliner seat: 700.00</strong>
              </p>
              <h3 className="text-[22px]">
                <br />
                Hall 3 (VIP)
              </h3>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>VIP seat: 1200.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>VIP seat: 1500.00</strong>
              </p>
              <div className="h-[2px] w-full bg-white" />
              <h2>Sony Square, Dhaka</h2>
              <h3 className="text-[22px]">Hall 1 Through Hall 3</h3>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>Regular seat: 450.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>Regular seat: 500.00</strong>
                <br />
                <br />
                &nbsp;
              </p>
              <div className="h-[2px] w-full bg-white" />
              <h2>Military Museum, Dhaka</h2>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>Seat: 350.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>Seat: 400.00</strong>
              </p>
              <p>&nbsp;</p>
              <div className="h-[2px] w-full bg-white" />
              <h2>Bali Arcade, Chattogram</h2>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>Seat: 400.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>Seat: 450.00</strong>
              </p>
              <div className="h-[2px] w-full bg-white" />
              <h2>Centrepoint, Dhaka</h2>
              <p>&nbsp;</p>
              <h3 className="text-[22px]">Royal Hall</h3>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>Royal seat: 1400.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>Royal seat: 1800.00</strong>
                <br />
                &nbsp;
              </p>
              <h3 className="text-[22px]">VIP Hall</h3>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>VIP seat: 900.00</strong>
                <br />
                <br />
                &nbsp;
              </p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>VIP seat: 1200.00</strong>
                <br />
                &nbsp;
              </p>
              <h3 className="text-[22px]">Premium Hall</h3>
              <p>&nbsp;</p>
              <p>
                <i>
                  Sunday through Thursday (Shows starting before 3 PM except
                  holidays)
                </i>
                <br />
                <strong>Premium seat: 450.00</strong>
                <br />
                <strong>Semi Recliner seat: 550.00</strong>
              </p>
              <p>&nbsp;</p>
              <p>
                <i>
                  Friday &amp; Saturday (including holidays and weekday
                  evenings)
                </i>
                <br />
                <strong>Premium seat: 550.00</strong>
                <br />
                <strong>Semi Recliner seat: 650.00</strong>
              </p>
            </div>
          </div>
          <div className="flex-[1]"></div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TicketPrice;

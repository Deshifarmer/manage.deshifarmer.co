import { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";
import useDarkMode from "@/hooks/useDarkMode";

const OrderTrack = ({ status }) => {
  const [statusUpdates, setStatusUpdates] = useState([]);

  useEffect(() => {
    // Dummy data for illustration purposes
    const dummyData = [
      {
        id: 1,
        status: "pending",
        date: "2023-09-15",
        text: "Pending",
        description: "Your order has been placed.",
      },
      {
        id: 2,
        status: "confirm by df cp",
        date: "2023-09-15",
        text: "Confirm by DF CP",
        description: "Your order has been placed.",
      },
      {
        id: 3,
        status: "processing by company",
        text: "Processing by Company",
        date: "2023-09-16",
        description: "Your order has been shipped.",
      },
      {
        id: 4,
        status: "ready to collect for distributor",
        text: "Ready to collect for distributor",
        date: "2023-09-17",
        description: "Your order is in queue.",
      },
      {
        id: 5,
        status: "ready to collect for me",
        text: "Ready to collect for me",
        date: "2023-09-18",
        description: "Your order is out for delivery.",
      },
      {
        id: 6,
        status: "collected by me",
        text: "Collected by me",
        date: "2023-09-19",
        description: "Your order has been delivered.",
      },
    ];

    setStatusUpdates(dummyData);
  }, []);

  // Define a CSS class for custom styling of the stepper

  // Function to find the index of the status with the desired text
  const findStatusIndex = (statusText) => {
    return statusUpdates.findIndex((update) => update.status === statusText);
  };

  // Get the index of the "active" status based on its text
  const activeStatusText = status; // Change this to your desired status text
  const activeStep = findStatusIndex(activeStatusText);
  const [isDark] = useDarkMode();
  console.log();

  return (
    <div>
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Order Tracker</h2>
        <Stepper
          steps={statusUpdates.map((update) => ({
            title: update.text,
          }))}
          activeStep={activeStep}
          size={50}
          completeTitleColor={isDark ? "#fff" : "#000"}
          activeTitleColor={isDark ? "#fff" : "#000"}
          activeCircleColor={isDark ? "#fff" : "#000"}
          circleFontSize={15}
          completeBarColor="#004225"
          barStyle="solid"
          lineMarginOffset={2}
        />
        {/* <div className="mt-4 flex justify-center text-center">
          {statusUpdates.map((update, index) => (
            <div
              key={update.id}
              className={index === activeStep ? "block" : "hidden"}
            >
              <h3 className="text-lg font-semibold capitalize ">
                {update.status}
              </h3>
              <p>{update.date}</p>
              <p>{update.description}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default OrderTrack;

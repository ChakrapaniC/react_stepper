import React, { useState, useRef, useEffect } from "react";

const Stepper = ({ stepConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0
  });

  const stepRef = useRef([]);

   useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepConfig.length]);
  const handleStep = () => {
    if (currentStep < stepConfig.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const calculateProgressBarWidth = () => {
    const totalSteps = stepConfig.length - 1;
    const completedSteps = currentStep - 1;
    const stepWidth = 100 / totalSteps; // Width percentage for each step
    const progressWidth = completedSteps * stepWidth; // Width covered by completed steps
    return progressWidth;
  };

  const ActiveComponent = stepConfig[currentStep - 1]?.Component;

  return (
    <>
      <div className="flex flex-row items-center justify-around w-[100%]">
        {stepConfig.map((step, index) => {
          const isCompleted = currentStep > index + 1 || isComplete;
          const isActive = currentStep === index + 1;

          let stepClassName = "w-10 h-10 rounded-[50%] flex justify-center items-center z-20 text-xl ";

          if (isCompleted) {
            stepClassName += " bg-green-500 text-white";
          } else if (isActive ) {
            stepClassName += " bg-blue-500 text-white";
          }

          return (
            <div
              key={index}
              ref={(el) => (stepRef.current[index] = el)}
              className="flex flex-col items-center gap-4"
            >
              <div className={stepClassName}>
                {isCompleted ? <span>&#10003;</span> : index + 1}
              </div>
              <div>{step.name}</div>
            </div>
          );
        })}
        <div
          className="absolute top-[10.5%] h-[4px] w-[100%]  transition ease delay-200"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight:margins.marginRight,
          }}
        >
          <div
            style={{ width: `${calculateProgressBarWidth()}%` }}
            className="h-[100%] bg-green-500"
          ></div>
        </div>
      </div>
      <ActiveComponent />

      {!isComplete && (
        <button
          onClick={handleStep}
          className="py-1 px-3 bg-red-400 border-none rounded-md"
        >
          {currentStep === stepConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default Stepper;
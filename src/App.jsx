import Stepper from "./component/Stepper";

function App() {
  
  const CHECKOUT_STEPS = [
    {
      name: "Customer Info",
      Component: () => <div>Provide your contact details.</div>,
    },
    {
      name: "Shipping Info",
      Component: () => <div>Enter your shipping address.</div>,
    },
    {
      name: "Payment",
      Component: () => <div>Complete payment for your order.</div>,
    },
    {
      name: "Delivered",
      Component: () => <div> Your order has been delivered.</div>,
    },
  ];
  

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="mt-2 text-2xl font-bold">checkout</h1>
        <Stepper stepConfig={CHECKOUT_STEPS}/>
      </div>

    </>
  )
}

export default App

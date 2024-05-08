// components/BalanceDisplay.js
const BalanceDisplay = ({ simplifiedDebts }) => {
    return (
      <div className="bg-gray-100 rounded p-4 mt-8">
        <h2 className="text-lg font-bold mb-4">Balance Summary</h2>
        <ul>
          {simplifiedDebts.map((debt, index) => (
            <li key={index} className="mb-2">
              <span className="font-bold">{debt.from}</span> owes <span className="font-bold">{debt.to}</span>: ${debt.amount}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default BalanceDisplay;
  
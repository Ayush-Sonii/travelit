
import { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [participantName, setParticipantName] = useState('');
  const [payer, setPayer] = useState('');

  const handleAddParticipant = () => {
    if (participantName.trim() !== '' && !participants.includes(participantName.trim())) {
      setParticipants([...participants, participantName.trim()]);
      setParticipantName('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() === '' || amount <= 0 || participants.length === 0 || payer === '') {
      return;
    }
    addExpense({ description, amount, participants, payer });
    setDescription('');
    setAmount(0);
    setParticipants([]);
    setParticipantName('');
    setPayer('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Description"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Amount"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="participantName">
          Participants
        </label>
        <div className="flex flex-wrap">
          {participants.map((participant, index) => (
            <div key={index} className="bg-gray-100 rounded px-3 py-2 mb-2 mr-2">{participant}</div>
          ))}
        </div>
        <input
          id="participantName"
          type="text"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Participant Name"
        />
        <button
          type="button"
          onClick={handleAddParticipant}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
        >
          Add Participant
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payer">
          Payer
        </label>
        <select
          id="payer"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
          required
        >
          <option value="">Select Payer</option>
          {participants.map((participant, index) => (
            <option key={index} value={participant}>{participant}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;

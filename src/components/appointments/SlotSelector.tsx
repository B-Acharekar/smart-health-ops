'use client';

export default function SlotSelector({
  date,
  slots,
  onSelect,
}: {
  date: Date;
  slots: string[];
  onSelect: (slot: string) => void;
}) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Available Slots on <span className="text-blue-600">{date.toDateString()}</span>:
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
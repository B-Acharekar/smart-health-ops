// components/ConfirmationMessage.tsx
'use client';

export default function ConfirmationMessage({ details }: { details: any }) {
  return (
    <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md">
      ✅ Appointment confirmed for <strong>{details.name}</strong> at{' '}
      <strong>{details.time}</strong> on <strong>{details.date.toDateString()}</strong>
      <br />
      Reason: {details.reason}
    </div>
  );
}

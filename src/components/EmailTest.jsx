import React, { useState } from 'react';
import { supabase } from '../lib/supabase'

export default function EmailTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sendTestEmail = async () => {
    try {
      setLoading(true);
      setResult(null);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: 'zak.meadows16@gmail.com',
          subject: 'Test Email',
          template: 'venue-approved',
          data: {
            ownerName: 'Zak',
            venueName: 'Test Venue'
          }
        }
      });

      if (error) {
        console.error('Function error:', error);
        throw error;
      }

      console.log('Function response:', data);
      setResult(data);
    } catch (error) {
      console.error('Error details:', error);
      setResult({ 
        error: error.message,
        details: error.details || error.stack || 'No additional details available'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={sendTestEmail}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Test Email'}
      </button>
      
      {result && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">
            {result.error ? 'Error' : 'Success'}
          </h3>
          <pre className="p-4 bg-gray-100 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 
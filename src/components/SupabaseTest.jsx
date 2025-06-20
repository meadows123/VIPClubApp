import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const SupabaseTest = () => {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [testResult, setTestResult] = useState('')

  // Test 1: Basic Connection Test
  const testConnection = async () => {
    try {
      setLoading(true)
      setTestResult('Testing connection...')
      const { data, error } = await supabase.from('venues').select('count')
      if (error) throw error
      setTestResult('✅ Connection successful!')
    } catch (error) {
      setTestResult('❌ Connection failed: ' + error.message)
      console.error('Connection error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Test 2: Fetch all venues
  const fetchVenues = async () => {
    try {
      setLoading(true)
      setTestResult('Fetching venues...')
      const { data, error } = await supabase
        .from('venues')
        .select('*')
      
      if (error) throw error
      setVenues(data)
      setTestResult('✅ Fetched ' + data.length + ' venues')
    } catch (error) {
      setError(error.message)
      setTestResult('❌ Fetch failed: ' + error.message)
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Test 3: Insert a new venue
  const insertVenue = async () => {
    try {
      setLoading(true)
      setTestResult('Inserting new venue...')
      const { data, error } = await supabase
        .from('venues')
        .insert([
          {
            name: 'Test Restaurant',
            type: 'restaurant',
            price_range: '$$',
            rating: 4.5,
            vibe: 'Sophisticated',
            address: '123 Test St',
            city: 'Lagos',
            state: 'Lagos',
            country: 'Nigeria',
            latitude: 6.5244,
            longitude: 3.3792
          }
        ])
        .select()
      
      if (error) throw error
      setTestResult('✅ Inserted new venue successfully')
      fetchVenues() // Refresh the list
    } catch (error) {
      setTestResult('❌ Insert failed: ' + error.message)
      console.error('Insert error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Test 4: Update a venue
  const updateVenue = async (venueId) => {
    try {
      setLoading(true)
      setTestResult('Updating venue...')
      const { data, error } = await supabase
        .from('venues')
        .update({ rating: 4.8 })
        .eq('id', venueId)
        .select()
      
      if (error) throw error
      setTestResult('✅ Updated venue successfully')
      fetchVenues() // Refresh the list
    } catch (error) {
      setTestResult('❌ Update failed: ' + error.message)
      console.error('Update error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Test 5: Delete a venue
  const deleteVenue = async (venueId) => {
    try {
      setLoading(true)
      setTestResult('Deleting venue...')
      const { error } = await supabase
        .from('venues')
        .delete()
        .eq('id', venueId)
      
      if (error) throw error
      setTestResult('✅ Deleted venue successfully')
      fetchVenues() // Refresh the list
    } catch (error) {
      setTestResult('❌ Delete failed: ' + error.message)
      console.error('Delete error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial connection test
  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p className="font-semibold">Test Result: {testResult}</p>
        {loading && <p className="text-brand-burgundy">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
      
      <div className="space-y-4 mb-8">
        <button
          onClick={testConnection}
          className="bg-brand-burgundy text-white px-4 py-2 rounded mr-2"
          disabled={loading}
        >
          Test Connection
        </button>
        
        <button
          onClick={fetchVenues}
          className="bg-brand-burgundy text-white px-4 py-2 rounded mr-2"
          disabled={loading}
        >
          Fetch All Venues
        </button>
        
        <button
          onClick={insertVenue}
          className="bg-brand-burgundy text-white px-4 py-2 rounded mr-2"
          disabled={loading}
        >
          Insert Test Venue
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Venues:</h2>
        {venues.map((venue) => (
          <div key={venue.id} className="border p-4 rounded">
            <h3 className="font-bold">{venue.name}</h3>
            <p>Type: {venue.type}</p>
            <p>Price Range: {venue.price_range}</p>
            <p>Rating: {venue.rating}</p>
            <p>Location: {venue.city}, {venue.country}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => updateVenue(venue.id)}
                className="bg-brand-gold text-brand-burgundy px-3 py-1 rounded text-sm"
                disabled={loading}
              >
                Update Rating
              </button>
              <button
                onClick={() => deleteVenue(venue.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupabaseTest 
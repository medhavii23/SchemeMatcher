import React from 'react';
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SchemeResults from './SchemeResults';
import './App.css';

const schemes = {
  financial: [
    { name: "Atal Pension Yojana (APY)", desc: "Pension scheme for unorganized sector workers." },
    { name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)", desc: "Bank accounts for all households." }
  ],
  agriculture: [
    { name: "PM Kisan Samman Nidhi Yojana", desc: "₹6,000 annual income support for small farmers." },
    { name: "PM Fasal Bima Yojana", desc: "Crop insurance during natural disasters." },
    { name: "Uzhavan Subsidy Program", desc: "Support for agricultural machinery and seeds." },
    { name: "Kuruvai Cultivation Assistance Scheme", desc: "Aid for short-term paddy farmers." }
  ],
  healthcare: [
    { name: "Ayushman Bharat (PMJAY)", desc: "₹5 lakh insurance coverage per family." },
    { name: "Jan Aushadhi Scheme", desc: "Access to affordable medicines." },
    { name: "Chief Minister’s Comprehensive Health Insurance Scheme (CMCHIS)", desc: "Free hospital treatment." },
    { name: "Makkalai Thedi Maruthuvam", desc: "Doorstep healthcare for chronic patients." }
  ],
  sanitation: [
    { name: "Swachh Bharat Mission (Gramin)", desc: "Household sanitation support." },
    { name: "Jal Jeevan Mission", desc: "Tap water for rural households." },
    { name: "Solid Waste Management Project", desc: "Waste segregation in panchayat areas." },
    { name: "Clean Village Program (Namma Ooru Nalla Ooru)", desc: "Village-level cleanliness drives." }
  ]
};

const schemeTypes = [
  { value: "financial", label: "Financial" },
  { value: "agriculture", label: "Agricultural" },
  { value: "healthcare", label: "Healthcare" },
  { value: "sanitation", label: "Sanitation and Hygiene" }
];

function FormPage({ setMatchedSchemes }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const selectedTypes = Array.isArray(data.schemeTypes) ? data.schemeTypes : [data.schemeTypes];
    let result = {};
    selectedTypes.forEach(type => {
      result[type] = schemes[type] || [];
    });
    setMatchedSchemes(result);
    navigate('/results');
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Scheme Simulation Corner</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Income:</label>
        <input
          type="number"
          {...register("income", { required: "Income is required", min: { value: 0, message: "Income must be positive" } })}
        />
        {errors.income && <span style={{ color: "red" }}>{errors.income.message}</span>}

        <label>Occupation:</label>
        <select {...register("occupation", { required: "Occupation is required" })}>
          <option value="">Select...</option>
          <option value="Farmer">Farmer</option>
          <option value="Health Worker">Health Worker</option>
          <option value="Other">Other</option>
        </select>
        {errors.occupation && <span style={{ color: "red" }}>{errors.occupation.message}</span>}

        <label>Location:</label>
        <select {...register("location", { required: "Location is required" })}>
          <option value="">Select...</option>
          <option value="Village">Village</option>
          <option value="Town">Town</option>
          <option value="City">City</option>
        </select>
        {errors.location && <span style={{ color: "red" }}>{errors.location.message}</span>}

        <label>Scheme Types:</label>
        <select
          multiple
          {...register("schemeTypes", { required: "Select at least one scheme type" })}
          style={{ height: "100px" }}
        >
          {schemeTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        {errors.schemeTypes && <span style={{ color: "red" }}>{errors.schemeTypes.message}</span>}

        <button type="submit" style={{ marginTop: 10 }}>Find Schemes</button>
      </form>
    </div>
  );
}

function App() {
  const [matchedSchemes, setMatchedSchemes] = React.useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage setMatchedSchemes={setMatchedSchemes} />} />
        <Route path="/results" element={<SchemeResults schemes={matchedSchemes || {}} schemeTypes={schemeTypes} />} />
      </Routes>
    </Router>
  );
}

export default App;

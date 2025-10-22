import React from 'react';
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

const schemes = [
  // Paste your full schemes array here from your schemes.js data
  // Example entry:
  {
    id: 1,
    name: "PM Kisan Samman Nidhi Yojana",
    name_ta: "பி.எம். கிசான் சம்மான் நிதி யோஜனை",
    level: "Central",
    category: "Agriculture",
    occupations: ["Farmer", "Agricultural Labourer"],
    incomeMax: 250000,
    casteEligible: ["All"],
    ageMin: 18,
    description: "₹6,000 annual income support for small/marginal farmers.",
    description_ta: "சிறு மற்றும் குறு விவசாயிகளுக்கு ஆண்டுக்கு ₹6,000 உதவி.",
    benefits: ["Direct bank transfer", "No application needed if land records exist"],
    benefits_ta: ["நேரடி வங்கி பரிமாற்றம்", "நில பதிவு இருந்தால் விண்ணப்பம் தேவையில்லை"],
    eligibility: ["Must be a farmer", "Own cultivable land", "Income ≤ ₹2.5L"],
    eligibility_ta: ["விவசாயி ஆக இருக்க வேண்டும்", "விவசாய நிலம் வைத்திருக்க வேண்டும்", "வருமானம் ₹2.5 லட்சத்திற்கு கீழ்"],
    process: ["Visit pmkisan.gov.in", "Enter Aadhaar & bank details", "Verify with local patwari"],
    process_ta: ["pmkisan.gov.in ஐ பார்வையிடவும்", "ஆதார் & வங்கி விவரங்களை உள்ளிடவும்", "உள்ளூர் வருவாய் அலுவலரிடம் சரிபார்க்கவும்"],
    applyLink: "https://pmkisan.gov.in"
  },
  // Add all schemes similarly
];

const schemeTypes = [
  { value: "Agriculture", label: "🌾 விவசாயம்" },
  { value: "Education", label: "📚 கல்வி" },
  { value: "Healthcare", label: "⚕️ மருத்துவம்" },
  { value: "Sanitation", label: "🧼 சுகாதாரம் மற்றும் சுத்தம்" },
  { value: "Financial Inclusion", label: "💰 நிதி" }
];

function FormPage({ setMatchedSchemes }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);

  const onSubmit = (data) => {
    // Filter schemes based on form data
    const matched = schemes.filter(scheme => {
      const occMatch = !scheme.occupations || scheme.occupations.includes(data.occupation);
      const incomeMatch = !scheme.incomeMax || data.income <= scheme.incomeMax;
      const casteMatch = scheme.casteEligible.includes("All") || (data.caste && scheme.casteEligible.includes(data.caste));
      const ageMatch = (!scheme.ageMin || data.age >= scheme.ageMin) && (!scheme.ageMax || data.age <= scheme.ageMax);
      let catMatch = true;
      if (categories.length) {
        catMatch = categories.includes(scheme.category);
      }
      return occMatch && incomeMatch && casteMatch && ageMatch && catMatch;
    });
    setMatchedSchemes(matched);
    navigate('/results');
  };

  return (
    <Container maxWidth="xs" disableGutters>
      <Box sx={{ minHeight: '100vh', pt: 2, pb: 4, px: 2 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #f0f7ff, #e3f2fd)' }}>
          <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 700, color: '#1565c0' }}>
            திட்டம் பயிற்சி மூலை
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="வருமானம்"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              size="medium"
              error={!!errors.income}
              helperText={errors.income?.message}
              {...register("income", { required: "வருமானம் அவசியம்", min: { value: 0, message: "நேர்மறை வருமானம் சேர்க்கவும்" } })}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>தொழில்</InputLabel>
              <Select
                defaultValue=""
                {...register("occupation", { required: "தொழில் தேர்வு அவசியம்" })}
              >
                <MenuItem value="Farmer">விவசாயி</MenuItem>
                <MenuItem value="Health Worker">மருத்துவ பணியாளர்</MenuItem>
                <MenuItem value="Student">மாணவர்</MenuItem>
                <MenuItem value="Other">மற்றவை</MenuItem>
              </Select>
            </FormControl>
            {errors.occupation && <Typography color="error" variant="caption">{errors.occupation.message}</Typography>}

            <FormControl fullWidth margin="normal">
              <InputLabel>இடம்</InputLabel>
              <Select
                defaultValue=""
                {...register("location", { required: "இடம் தேர்வு அவசியம்" })}
              >
                <MenuItem value="Village">கிராமம்</MenuItem>
                <MenuItem value="Town">நகரம்</MenuItem>
                <MenuItem value="City">மாநகர்</MenuItem>
              </Select>
            </FormControl>
            {errors.location && <Typography color="error" variant="caption">{errors.location.message}</Typography>}

            <TextField
              label="வயது"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              size="medium"
              error={!!errors.age}
              helperText={errors.age?.message}
              {...register("age", { required: "வயது அவசியம்", min: { value: 0, message: "சரியான வயதைக் கொடுக்கவும்" } })}
            />

            {/* Optional caste selection */}
            {/* Example: <TextField label="ஜாதி" {...register("caste")} /> */}

            <FormControl fullWidth margin="normal">
              <InputLabel>திட்ட வகைகள்</InputLabel>
              <Select
                multiple
                value={categories}
                onChange={(event) => setCategories(event.target.value)}
                input={<OutlinedInput label="திட்ட வகைகள்" />}
                renderValue={(selected) => selected.map(s => schemeTypes.find(t => t.value === s)?.label).join(', ')}
              >
                {schemeTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    <Checkbox checked={categories.indexOf(type.value) > -1} />
                    <ListItemText primary={type.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box textAlign="center" mt={3}>
              <Button type="submit" variant="contained" fullWidth color="primary" size="large">
                திட்டங்களை கண்டறியவும்
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

function SchemeResults({ schemes }) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 'bold', color: '#1565c0' }}>
        பொருந்திய அரசு திட்டங்கள்
      </Typography>
      {schemes.length === 0 && (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          தற்போது பொருந்தும் திட்டங்கள் இல்லை.
        </Typography>
      )}
      {schemes.map(scheme => (
        <Paper key={scheme.id} sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ color: '#0d47a1' }}>
            {scheme.name_ta}
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {scheme.level === 'Central' ? 'மத்திய அரசு' : 'மாநில அரசு'} | {scheme.category}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {scheme.description_ta}
          </Typography>
          {scheme.benefits_ta && (
            <>
              <Typography variant="subtitle2">சலுகைகள்:</Typography>
              <ul>
                {scheme.benefits_ta.map((b, idx) => <li key={idx}>{b}</li>)}
              </ul>
            </>
          )}
          {scheme.eligibility_ta && (
            <>
              <Typography variant="subtitle2">தகுதி:</Typography>
              <ul>
                {scheme.eligibility_ta.map((e, idx) => <li key={idx}>{e}</li>)}
              </ul>
            </>
          )}
          {scheme.process_ta && (
            <>
              <Typography variant="subtitle2">விண்ணப்பிக்கும் முறை:</Typography>
              <ul>
                {scheme.process_ta.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </>
          )}
          <Box mt={1}>
            <Button variant="contained" color="primary" href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
              இணையதளத்தில் விண்ணப்பிக்க
            </Button>
          </Box>
        </Paper>
      ))}
      <Box textAlign="center">
        <Button variant="outlined" onClick={() => navigate('/')}>
          புதிய தேடல்
        </Button>
      </Box>
    </Container>
  );
}

function App() {
  const [matchedSchemes, setMatchedSchemes] = React.useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage setMatchedSchemes={setMatchedSchemes} />} />
        <Route path="/results" element={<SchemeResults schemes={matchedSchemes} />} />
      </Routes>
    </Router>
  );
}

export default App;

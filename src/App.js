import React from 'react';
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SchemeResults from './SchemeResults';
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
import './App.css';

const schemes = {
  financial: [
    { name: "அடல் ஓய்வூதிய திட்டம் (APY)", desc: "ஒழுங்கற்ற துறையில் பணிபுரிபவர்களுக்கு ஓய்வூதியம் வழங்கப்படும் திட்டம்." },
    { name: "பிரதான் மந்திரி ஜன் தன் யோஜனா (PMJDY)", desc: "ஒவ்வொரு குடும்பத்திற்கும் வங்கிக் கணக்கு திறப்பதற்கான திட்டம்." }
  ],
  agriculture: [
    { name: "பிஎம் கிசான் சம்மான் நிதி யோஜனா", desc: "சிறு விவசாயிகளுக்கு ஆண்டுக்கு ₹6,000 வருமான ஆதரவு." },
    { name: "பிஎம் பயிர் காப்பீட்டு திட்டம்", desc: "இயற்கை பேரழிவுகளில் பயிர் காப்பீடு." },
    { name: "உழவன் மானியம் திட்டம்", desc: "விவசாய இயந்திரங்கள் மற்றும் விதைகளுக்கான உதவி." },
    { name: "குருவை சாகுபடி உதவி திட்டம்", desc: "குறுகிய கால நெல் விவசாயிகளுக்கு நிதி உதவி." }
  ],
  healthcare: [
    { name: "ஆயுஷ்மான் பாரத் (PMJAY)", desc: "ஒவ்வொரு குடும்பத்திற்கும் ₹5 லட்சம் மருத்துவ காப்பீடு." },
    { name: "ஜன் அவ்ஷதீ திட்டம்", desc: "மருந்துகள் குறைந்த விலையில் கிடைக்கும் திட்டம்." },
    { name: "முதல்வர் முழுமையான மருத்துவ காப்பீட்டு திட்டம் (CMCHIS)", desc: "அரசு மருத்துவமனைகளில் இலவச சிகிச்சை." },
    { name: "மக்கலை தேடி மருத்துவம்", desc: "நீண்டநாள் நோயாளிகளுக்கு வீட்டு வாசலில் மருத்துவ உதவி." }
  ],
  sanitation: [
    { name: "சுவச்ச் பாரத் மிஷன் (கிராமீன்)", desc: "குடில்களுக்கு கழிவறை அமைப்பதற்கான உதவி." },
    { name: "ஜல் ஜீவன் மிஷன்", desc: "கிராமங்களுக்கு குழாய் நீர் வழங்கும் திட்டம்." },
    { name: "திடக் கழிவு மேலாண்மை திட்டம்", desc: "பஞ்சாயத்துகளில் கழிவு பிரித்தல் மற்றும் மேலாண்மை." },
    { name: "சுத்தமான கிராம திட்டம் (நம்ம ஊரு நல்ல ஊரு)", desc: "கிராமங்களுக்கு சுத்தம் மற்றும் சுகாதார இயக்கம்." }
  ]
};

const schemeTypes = [
  { value: "financial", label: "நிதி" },
  { value: "agriculture", label: "விவசாயம்" },
  { value: "healthcare", label: "மருத்துவம்" },
  { value: "sanitation", label: "சுகாதாரம் மற்றும் சுத்தம்" }
];

function FormPage({ setMatchedSchemes }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [schemeSelection, setSchemeSelection] = React.useState([]);

  const onSubmit = (data) => {
    const result = {};
    schemeSelection.forEach(type => {
      result[type] = schemes[type] || [];
    });
    setMatchedSchemes(result);
    navigate('/results');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{
        padding: 4,
        marginTop: 8,
        borderRadius: 4,
        background: "linear-gradient(145deg, #f8f9fa, #ffffff)",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.1)"
      }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 700, color: "#1565c0" }}
        >
          திட்டம் பயிற்சி மூலை
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "#5a5a5a", mb: 3 }}
        >
          உங்கள் விவரங்களை உள்ளிட்டு பொருந்தும் அரசு திட்டங்களை பாருங்கள்
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="வருமானம்"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            error={Boolean(errors.income)}
            helperText={errors.income?.message}
            {...register("income", { required: "வருமானம் அவசியம் தேவை", min: { value: 0, message: "வருமானம் நேர்மறையாக இருக்க வேண்டும்" } })}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>தொழில்</InputLabel>
            <Select
              defaultValue=""
              {...register("occupation", { required: "தொழில் தேர்வு அவசியம்" })}
            >
              <MenuItem value="Farmer">விவசாயி</MenuItem>
              <MenuItem value="Health Worker">மருத்துவ பணியாளர்</MenuItem>
              <MenuItem value="Other">மற்றவை</MenuItem>
            </Select>
          </FormControl>
          {errors.occupation && <Typography color="error">{errors.occupation.message}</Typography>}

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
          {errors.location && <Typography color="error">{errors.location.message}</Typography>}

          <FormControl fullWidth margin="normal">
            <InputLabel>திட்ட வகைகள்</InputLabel>
            <Select
              multiple
              value={schemeSelection}
              onChange={(event) => setSchemeSelection(event.target.value)}
              input={<OutlinedInput label="திட்ட வகைகள்" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {schemeTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  <Checkbox checked={schemeSelection.indexOf(type.value) > -1} />
                  <ListItemText primary={type.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box textAlign="center" mt={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: '25px',
                px: 6,
                background: "linear-gradient(45deg, #2196f3, #42a5f5)",
                '&:hover': { background: "linear-gradient(45deg, #1976d2, #2196f3)" }
              }}
            >
              திட்டங்களை கண்டறியவும்
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
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

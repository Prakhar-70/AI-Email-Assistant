
// import { Box, Container, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress} from '@mui/material';
// import './App.css';
// import { useState } from 'react';
// import axios from 'axios';


// function App() {
//   const [emailContent, setEmailContent] = useState('');
//   const [tone, setTone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [generatedReply, setGeneratedReply] = useState('');

//   const handleSubmit = async () => {
//     setLoading(true);
//    try {
//       const response = await axios.post("http://localhost:8080/api/email/generate",{
//         emailContent,
//         tone
//    });
//       setGeneratedReply(typeof response.data === 'string' ?
//         response.data : JSON.stringify(response.data)
//       );
//     } catch (error) {
//        // Optionally, display an error message
//     console.error("Failed to generate reply:", error);
//     setGeneratedReply("Failed to generate reply.");
      
//     } finally{
//       setLoading(false);
//     }
//   };
  
//   return (
//     <>
//        <Container maxWidth="md" sx={{py:4}}>
//         <Typography variant='h3' component="h1" gutterBottom>
//           Email Reply Generator
//         </Typography>
//         <Box sx={{mx:3}}>
//           <TextField
//            fullWidth
//            multiline
//            rows={6}
//            variant='outlined'
//            label = "Original Email Content"
//            value={emailContent || ''}
//            onChange={(e) => setEmailContent(e.target.value)}
//            sx={{mb:2}}
//           />
//           <FormControl fullWidth sx={{mb:2}}>
//             <InputLabel>Tone (Optional)</InputLabel>
//             <Select
//               value={tone || ''}
//               label="Tone (Optional)"
//               onChange={(e) => setTone(e.target.value)}
//             >
//               <MenuItem value="">None</MenuItem>
//               <MenuItem value="professional">Professional</MenuItem>
//               <MenuItem value="casual">Casual</MenuItem>
//                <MenuItem value="friendly">Friendly</MenuItem>
//             </Select>
//           </FormControl>
//           <Button variant="contained"
//           sx={{mb:2}}
//            onClick={handleSubmit} 
//            disabled={!emailContent || loading}>
//             {loading ? <CircularProgress size={24}/>: "Generate Reply"}
//           </Button>
//         </Box>
//         <Box sx={{mx:3}}>
//           <TextField
//            fullWidth
//            multiline
//            rows={6}
//            variant='outlined'
//            value= {generatedReply || ''}
//            InputProps={{readOnly:true}}
//            sx={{mb:2}}
//           />
//            <Button
//           variant='outlined'
//           onClick={() => navigator.clipboard.write(generatedReply)}>
//             Copy To Clipboard
//           </Button>
//           </Box>
//        </Container>
//     </>
//   )
// }

// export default App



import { Box, Container, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress, Card, CardContent } from '@mui/material';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedReply, setGeneratedReply] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string'
        ? response.data
        : JSON.stringify(response.data)
      );
    } catch (error) {
      console.error("Failed to generate reply:", error);
      setGeneratedReply("Failed to generate reply.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="app-background">
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Card className="main-card">
          <CardContent>
            <Typography variant='h4' component="h1" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>
              ✉️ AI Email Reply Generator
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              label="Original Email Content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

            <Box textAlign="center" sx={{ mb: 4 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!emailContent || loading}
                sx={{
                  px: 4, py: 1.2,
                  fontSize: '1rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(45deg, #3b82f6, #06b6d4)',
                  boxShadow: 3,
                  textTransform: 'none',
                }}
              >
                {loading ? <CircularProgress size={26} color="inherit" /> : "Generate Reply"}
              </Button>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              value={generatedReply}
              InputProps={{ readOnly: true }}
              sx={{ mb: 3 }}
              placeholder="Your generated email reply will appear here..."
            />

            <Box textAlign="right">
              <Button
                variant='outlined'
                onClick={() => navigator.clipboard.writeText(generatedReply)}
                sx={{
                  borderRadius: '12px',
                  borderColor: '#06b6d4',
                  color: '#06b6d4',
                  textTransform: 'none',
                  '&:hover': { borderColor: '#0284c7', color: '#0284c7' }
                }}
              >
                Copy to Clipboard
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App;

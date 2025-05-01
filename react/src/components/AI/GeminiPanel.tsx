import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, CircularProgress } from '@mui/material';

const GeminiPanel: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      setLoading(true);
      const response = await axios.post('https://localhost:7143/api/Gemini/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysisResult(response.data.result);
    } catch (error) {
      console.error(error);
      setAnalysisResult('⚠️ שגיאה בשליחה לשרת.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto my-10 p-6 rounded-2xl shadow-lg border">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">📷 ניתוח תמונה עם Gemini</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!imageFile || loading}
          className="mt-4"
        >
          שלח לניתוח
        </Button>

        {loading && <CircularProgress className="mt-4" />}
        {analysisResult && (
          <p className="mt-4 whitespace-pre-wrap text-gray-700">{analysisResult}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default GeminiPanel;

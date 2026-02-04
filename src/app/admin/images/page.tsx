'use client';

import { useState, useRef } from 'react';
import { upload } from '@vercel/blob/client';
import { useProjects, useProjectImages } from '@/hooks/useProjects';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function AdminImagesPage() {
  const { projects, loading: projectsLoading } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<number | ''>('');
  const { images, loading: imagesLoading, refetch } = useProjectImages(
    typeof selectedProjectId === 'number' ? selectedProjectId : 0
  );
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [altText, setAltText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setMessage(null);
    } else {
      setSelectedFileName(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const file = fileInputRef.current?.files?.[0];
    if (!file || selectedProjectId === '') {
      setMessage({ type: 'error', text: 'Vennligst velg et prosjekt og en fil' });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setMessage(null);

    try {
      // Use Vercel Blob client upload for better reliability and larger files
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        clientPayload: JSON.stringify({
          projectId: selectedProjectId,
          altText: altText || `Project ${selectedProjectId} screenshot`,
        }),
        onUploadProgress: (progress) => {
          setUploadProgress(progress.percentage);
        },
      });

      console.log('Upload successful:', blob.url);

      // Save image reference to database
      // (onUploadCompleted callback doesn't work on localhost)
      const saveResponse = await fetch('/api/images/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: selectedProjectId,
          imageUrl: blob.url,
          altText: altText || `Project ${selectedProjectId} screenshot`,
        }),
      });

      if (!saveResponse.ok) {
        console.error('Failed to save image to database');
      }

      setMessage({ type: 'success', text: 'Bilde lastet opp!' });
      setAltText('');
      setSelectedFileName(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Wait a bit for the database to be updated, then refetch
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Opplasting feilet' 
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: { xs: 14, md: 16 }, pb: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 300, letterSpacing: '0.1em', mb: 4 }}>
          Bildeopplasting
        </Typography>

        {/* Upload Form */}
        <Card sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Last opp nytt bilde
          </Typography>
          
          <form onSubmit={handleUpload}>
            <Stack spacing={3}>
              {/* Project Selection */}
              <FormControl fullWidth>
                <InputLabel>Velg prosjekt</InputLabel>
                <Select
                  value={selectedProjectId}
                  label="Velg prosjekt"
                  onChange={(e) => setSelectedProjectId(e.target.value as number)}
                  disabled={projectsLoading || uploading}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.id} - {project.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* File Input */}
              <Box>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  onChange={handleFileChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{ py: 2 }}
                    disabled={uploading}
                  >
                    Velg bilde
                  </Button>
                </label>
                {selectedFileName && (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    Valgt fil: <strong>{selectedFileName}</strong>
                  </Alert>
                )}
              </Box>

              {/* Alt Text */}
              <TextField
                label="Alt-tekst (beskrivelse)"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="f.eks. 'Desktop view', 'Mobile screenshot', 'Tablet view'"
                helperText="Bruk 'mobile' eller 'phone' i teksten for mobilbilder, 'tablet' for nettbrett"
                fullWidth
                disabled={uploading}
              />

              {/* Upload Progress */}
              {uploading && (
                <Box sx={{ width: '100%' }}>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                  <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                    Laster opp... {Math.round(uploadProgress)}%
                  </Typography>
                </Box>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={uploading || selectedProjectId === '' || !selectedFileName}
                startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
              >
                {uploading ? 'Laster opp...' : 'Last opp'}
              </Button>

              {/* Message */}
              {message && (
                <Alert severity={message.type}>
                  {message.text}
                </Alert>
              )}
            </Stack>
          </form>
        </Card>

        {/* Current Images */}
        {selectedProjectId !== '' && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Bilder for prosjekt {selectedProjectId}
            </Typography>
            
            {imagesLoading ? (
              <CircularProgress />
            ) : images.length === 0 ? (
              <Alert severity="info">Ingen bilder funnet for dette prosjektet</Alert>
            ) : (
              <Stack direction="row" flexWrap="wrap" gap={2}>
                {images.map((image) => (
                  <Card key={image.id} sx={{ width: 280 }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={image.image_url}
                      alt={image.alt_text || 'Project image'}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="caption" color="text.secondary" display="block">
                        ID: {image.id} | Order: {image.order_index}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {image.alt_text || 'Ingen beskrivelse'}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        {image.alt_text?.toLowerCase().includes('mobile') && (
                          <Chip label="Mobile" size="small" color="primary" />
                        )}
                        {image.alt_text?.toLowerCase().includes('tablet') && (
                          <Chip label="Tablet" size="small" color="secondary" />
                        )}
                        {!image.alt_text?.toLowerCase().includes('mobile') && 
                         !image.alt_text?.toLowerCase().includes('tablet') && (
                          <Chip label="Desktop" size="small" />
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </Box>
        )}

        {/* Instructions */}
        <Card sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Instruksjoner
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
              <li>Velg prosjektet du vil laste opp bilder til</li>
              <li>Klikk &quot;Velg bilde&quot; og velg et bilde fra datamaskinen din</li>
              <li>Skriv inn en beskrivelse (alt-tekst) for bildet</li>
              <li>For å vise bildet i riktig enhet, bruk disse nøkkelordene i alt-teksten:
                <ul>
                  <li><strong>Desktop:</strong> Standard (ikke bruk &quot;mobile&quot; eller &quot;tablet&quot;)</li>
                  <li><strong>Mobil:</strong> Inkluder &quot;mobile&quot; eller &quot;phone&quot; i teksten</li>
                  <li><strong>Nettbrett:</strong> Inkluder &quot;tablet&quot; i teksten</li>
                </ul>
              </li>
              <li>Klikk &quot;Last opp&quot;</li>
            </ol>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}

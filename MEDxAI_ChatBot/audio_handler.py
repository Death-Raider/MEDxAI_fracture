import torch
from transformers import pipeline
import librosa
import io
import wave
import os

# def convert_bytes_to_array(audio_bytes):
#     output_file = "output.wav"
#     audio_bytes=io.BytesIO(audio_bytes)
#     with wave.open(output_file, 'wb') as wav_file:
#         wav_file.setnchannels(1)  
#         wav_file.setsampwidth(2)   
#         wav_file.setframerate(48000)  
#         wav_file.writeframes(audio_bytes.read())
#     audio,sample_rate = librosa.load(output_file)
#     print(sample_rate)
#     os.remove(output_file)
#     return audio

def convert_bytes_to_array(audio_bytes):
    audio_bytes=io.BytesIO(audio_bytes)
    audio,sample_rate = librosa.load(audio_bytes)
    print(sample_rate)
    return audio


def transcribe_audio(audio_bytes):
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    pipe = pipeline(
        task="automatic-speech-recognition",
        model="openai/whisper-small",
        chunk_length_s=30,
        device=device,
    )
    audio_array=convert_bytes_to_array(audio_bytes)
    prediction = pipe(audio_array, batch_size=1)["text"]
    return prediction

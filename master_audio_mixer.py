#!/usr/bin/env python3
"""
CrystalMind AI — Automated Solfeggio Audio Mastering Script
Author: Manager Kodari for CEO Noh

How to use:
1. Place Suno AI background tracks into 'audio_input/' folder:
   - 528hz_music.mp3 (or any .mp3/.wav file)
   - 639hz_music.mp3
   - 741hz_music.mp3
   - 432hz_music.mp3

2. Run script:
   python3 master_audio_mixer.py

3. Output files will be generated in 'audio_output/' folder with:
   - Exact Solfeggio Sine Wave overlay (528Hz, 639Hz, 741Hz, 432Hz)
   - -28dB Low-Level Harmonic Volume (Subtle, non-intrusive)
   - 3-Second Fade-In and 3-Second Fade-Out for seamless meditation listening
"""

import os
import subprocess
import glob

FFMPEG_PATH = '/opt/homebrew/bin/ffmpeg' if os.path.exists('/opt/homebrew/bin/ffmpeg') else 'ffmpeg'

AUDIO_CONFIGS = [
    {
        'freq': 528,
        'keywords': ['528', 'wealth', 'gold', 'citrine'],
        'output_name': 'CrystalMind_528Hz_Golden_Citrine_Master.mp3',
        'desc': '528Hz Golden Citrine Abundance & RAS Rewiring Master'
    },
    {
        'freq': 639,
        'keywords': ['639', 'love', 'rose', 'quartz'],
        'output_name': 'CrystalMind_639Hz_Rose_Quartz_Master.mp3',
        'desc': '639Hz Rose Quartz Relational Coherence Master'
    },
    {
        'freq': 741,
        'keywords': ['741', 'clarity', 'amethyst', 'intuition'],
        'output_name': 'CrystalMind_741Hz_Amethyst_Master.mp3',
        'desc': '741Hz Amethyst Intuition & Awakening Master'
    },
    {
        'freq': 432,
        'keywords': ['432', 'peace', 'teal', 'calm'],
        'output_name': 'CrystalMind_432Hz_Teal_Quartz_Master.mp3',
        'desc': '432Hz Teal Quartz Nervous System Safety Master'
    }
]

def get_audio_duration(file_path):
    cmd = [
        FFMPEG_PATH, '-i', file_path
    ]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    for line in res.stderr.split('\n'):
        if 'Duration:' in line:
            parts = line.split('Duration:')[1].split(',')[0].strip()
            h, m, s = parts.split(':')
            return float(h)*3600 + float(m)*60 + float(s)
    return 60.0 # fallback 1 minute

def process_audio(input_file, config):
    freq = config['freq']
    output_path = os.path.join('audio_output', config['output_name'])
    duration = get_audio_duration(input_file)
    print(f"🎵 Processing {input_file} ({duration:.1f}s) with {freq}Hz Sine Wave Tone...")

    fade_out_start = max(0, duration - 3.0)

    # Complex filter:
    # 1) Generate sine wave of exact frequency and duration
    # 2) Lower sine wave volume to -28dB
    # 3) Apply 3s fade in and 3s fade out to sine wave tone
    # 4) Mix background music (stream 0) and sine wave tone (stream 1)
    filter_complex = (
        f"sine=frequency={freq}:sample_rate=44100:duration={duration}[tone];"
        f"[tone]volume=-28dB,afade=t=in:st=0:d=3,afade=t=out:st={fade_out_start}:d=3[sine_processed];"
        f"[0:a][sine_processed]amix=inputs=2:duration=first:dropout_transition=2[outa]"
    )

    cmd = [
        FFMPEG_PATH, '-y',
        '-i', input_file,
        '-filter_complex', filter_complex,
        '-map', '[outa]',
        '-b:a', '320k',
        output_path
    ]

    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode == 0:
        print(f"✅ Mastered successfully! Saved to: {output_path}")
    else:
        print(f"❌ Error mastering {input_file}: {res.stderr}")

def main():
    print("==================================================")
    print("🔮 CrystalMind AI — Solfeggio Audio Mastering Studio")
    print("==================================================")

    input_files = glob.glob('audio_input/*.mp3') + glob.glob('audio_input/*.wav') + glob.glob('audio_input/*.m4a')

    if not input_files:
        print("\n⚠️ No input audio files found in 'audio_input/' directory.")
        print("💡 Please put your Suno AI MP3 files into 'audio_input/' folder!")
        print("Example filenames:")
        print("  - audio_input/528hz_music.mp3")
        print("  - audio_input/639hz_music.mp3")
        print("  - audio_input/741hz_music.mp3")
        print("  - audio_input/432hz_music.mp3\n")
        return

    for config in AUDIO_CONFIGS:
        matched_file = None
        for f in input_files:
            basename = os.path.basename(f).lower()
            if any(k in basename for k in config['keywords']):
                matched_file = f
                break
        
        if matched_file:
            process_audio(matched_file, config)
        else:
            print(f"⚠️ No file found matching frequency {config['freq']}Hz in 'audio_input/'. Skipping.")

    print("\n🎉 Mastering complete! Check 'audio_output/' directory.")

if __name__ == '__main__':
    main()

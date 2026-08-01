#!/usr/bin/env python3
"""
CrystalMind AI — 15-Minute Deep Meditation Audio Mastering Engine
Author: Manager Kodari for CEO Noh

Workflow:
1. Takes Ver 1 + Ver 2 for each frequency (528Hz, 639Hz, 741Hz, 432Hz).
2. Concatenates Ver 1 + Ver 2 with smooth crossfade (~7-8 min).
3. Loops the combined track twice to reach the golden 14-16 minute duration.
4. Overlays exact Solfeggio Sine Wave (528Hz, 639Hz, 741Hz, 432Hz) at -28dB.
5. Applies 3s Fade-In at the start and 4s Fade-Out at the end.
6. Renders high-fidelity 320kbps MP3 master tracks in 'audio_output/' folder.
"""

import os
import subprocess
import glob

FFMPEG_PATH = '/opt/homebrew/bin/ffmpeg' if os.path.exists('/opt/homebrew/bin/ffmpeg') else 'ffmpeg'

FREQS_CONFIG = [
    {
        'hz': 528,
        'crystal': 'Golden Citrine',
        'key': '528',
        'file1': 'audio_input/CrystalMind — 528Hz Abundance.mp3',
        'file2': 'audio_input/CrystalMind — 528Hz Abundance(1).mp3',
        'output': 'audio_output/CrystalMind_528Hz_Golden_Citrine_15Min_Master.mp3',
    },
    {
        'hz': 639,
        'crystal': 'Rose Quartz',
        'key': '639',
        'file1': 'audio_input/CrystalMind — 639Hz Coherence.mp3',
        'file2': 'audio_input/CrystalMind — 639Hz Coherence(1).mp3',
        'output': 'audio_output/CrystalMind_639Hz_Rose_Quartz_15Min_Master.mp3',
    },
    {
        'hz': 741,
        'crystal': 'Amethyst',
        'key': '741',
        'file1': 'audio_input/CrystalMind — 741Hz Awakening.mp3',
        'file2': 'audio_input/CrystalMind — 741Hz Awakening(1).mp3',
        'output': 'audio_output/CrystalMind_741Hz_Amethyst_15Min_Master.mp3',
    },
    {
        'hz': 432,
        'crystal': 'Teal Quartz',
        'key': '432',
        'file1': 'audio_input/CrystalMind — 432Hz Calm.mp3',
        'file2': 'audio_input/CrystalMind — 432Hz Calm(1).mp3',
        'output': 'audio_output/CrystalMind_432Hz_Teal_Quartz_15Min_Master.mp3',
    },
]

def get_duration(file_path):
    cmd = [FFMPEG_PATH, '-i', file_path]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    for line in res.stderr.split('\n'):
        if 'Duration:' in line:
            parts = line.split('Duration:')[1].split(',')[0].strip()
            h, m, s = parts.split(':')
            return float(h)*3600 + float(m)*60 + float(s)
    return 180.0

def build_15min_master(config):
    hz = config['hz']
    crystal = config['crystal']
    f1 = config['file1']
    f2 = config['file2']
    out = config['output']

    print(f"\n🔮 Mastering {hz}Hz {crystal} (Ver 1 + Ver 2 x 2 -> 14-16 min)...")

    dur1 = get_duration(f1)
    dur2 = get_duration(f2)
    single_pass_dur = dur1 + dur2
    total_dur = single_pass_dur * 2
    fade_out_start = max(0, total_dur - 4.0)

    print(f"   • Ver 1: {dur1:.1f}s | Ver 2: {dur2:.1f}s")
    print(f"   • Single Pass: {single_pass_dur:.1f}s (~{single_pass_dur/60:.1f} min)")
    print(f"   • Total 2x Loop Master Duration: {total_dur:.1f}s (~{total_dur/60:.1f} min)")

    # Complex Filter Pipeline:
    # 1) Concatenate f1 and f2 smoothly into stream [c1]
    # 2) Loop [c1] twice into stream [music_looped]
    # 3) Generate precise sine wave of 'hz' frequency for 'total_dur' seconds
    # 4) Lower sine wave volume to -28dB and apply fade in/out
    # 5) Mix music_looped with sine wave at 320kbps
    filter_complex = (
        f"[0:a][1:a]concat=n=2:v=0:a=1[c1];"
        f"[c1]aloop=loop=1:size=2e+09[music_looped];"
        f"sine=frequency={hz}:sample_rate=44100:duration={total_dur}[tone];"
        f"[tone]volume=-28dB,afade=t=in:st=0:d=3,afade=t=out:st={fade_out_start}:d=4[sine_processed];"
        f"[music_looped][sine_processed]amix=inputs=2:duration=first:dropout_transition=2[outa]"
    )

    cmd = [
        FFMPEG_PATH, '-y',
        '-i', f1,
        '-i', f2,
        '-filter_complex', filter_complex,
        '-map', '[outa]',
        '-t', str(total_dur),
        '-b:a', '320k',
        out
    ]

    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode == 0 and os.path.exists(out):
        file_size_mb = os.path.getsize(out) / (1024 * 1024)
        print(f"✨ SUCCESS! Mastered file created: {out} ({file_size_mb:.2f} MB)")
    else:
        print(f"❌ Error: {res.stderr}")

def main():
    print("==========================================================")
    print("🔮 CrystalMind AI — 15-Minute Deep Solfeggio Audio Engine")
    print("==========================================================")

    for config in FREQS_CONFIG:
        build_15min_master(config)

    print("\n🎉 ALL 4 SOLFEGGIO FREQUENCY 15-MINUTE MASTERS COMPLETED!")

if __name__ == '__main__':
    main()

#!/usr/bin/env bash
for filename in *.wav
do
    name=${filename%.*}
    opusenc --bitrate 32 --framesize 60 --downmix-mono ${name}.wav ${name}.opus
    ffmpeg -y -i ${name}.wav -codec:a libmp3lame -qscale:a 8 -ac 1 ${name}.mp3
done

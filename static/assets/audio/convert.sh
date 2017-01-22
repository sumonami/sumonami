#!/usr/bin/env bash
for filename in *.wav
do
    name=${filename%.*}
    opusenc --bitrate 96 ${name}.wav ${name}.opus
    ffmpeg -i ${name}.wav -codec:a libmp3lame -qscale:a 2 ${name}.mp3
done

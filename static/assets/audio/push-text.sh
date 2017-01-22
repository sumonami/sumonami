#!/usr/bin/env bash
for filename in *.wav
do
    name=${filename%.*}
    echo "        ['${name}', ['audio/${name}.mp3',
                             'audio/${name}.opus']
        ],"
done

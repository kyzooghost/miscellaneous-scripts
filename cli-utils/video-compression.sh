# Do on high-CPU count VM, not local machine

# Take all .mp4 files in current directory, and compress

for f in *.mp4; do
  docker run --rm -v "$(pwd)":/data jrottenberg/ffmpeg:latest \
    -i "/data/$f" \
    -vcodec libx264 -preset slow -crf 28 -maxrate 3500k -bufsize 7000k \
    -acodec aac -b:a 96k \
    "/data/compressed_$f";
done

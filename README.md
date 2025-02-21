# FileFlowsResources
Scrips and other things for FileFlows

## Scripts
* [HEVC-Main10-p010le.js](scripts/HEVC-Main10-p010le.js)
  - A FileFlows script to detect if the video stream matches HEVC using Main 10 and p010le (or yuv420p101le) pixel format.
* [SizeDurationRatio.js](scripts/SizeDurationRatio.js)
  - A FileFlows script to calculate the 'size per duration' (Gb Per Hour, or Mb Per Minute)

## Flows
* [H265 Flow](flows/H265 Flow (Intel QSV and NVIDIA NVENC).json)
  - A flow to convert videos if...
    + Source is higher than an acceptable bitrate
    + Not using H265/HEVC codec
  - Using Intel QuickSync or NVIDIA NVENC hardware transcoding
    + or passthrough/copy if the video stream is already H265/HEVC and acceptable bitrate
  - Remove Non-Original and Non-English Audio and Subtitle streams
    + Non-Commentary is transcoded to AC3 matching the channels and sample rate, but 128Kbps per channel
    + Commentary is downmixed to stereo AC3 at 160Kbps total
  - Checks the output video duration matches the source
  - Checks the output video size is smaller than the source
  - Looks up the correct film name and year to name the file "<Title> (<year>) <height>p.mkv" e.g., "Gatacca (1997) 1080p.mkv", preserving the original file date/timestamps.

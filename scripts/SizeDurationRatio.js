/**
 * @description Works out a video file's size proportion compared to it's duration
 * @param {('Gb Per Hour'|'Mb Per Minute')} Unit of measurement
 * @param {string} Threshold Gb per hour or Mb per minute
 * @output Video is BELOW Gb Per Hour Threshold
 * @output Video is ABOVE Gb Per Hour Threshold
 */
function Script(Unit,Threshold)
{
    let result = 0;
    let size = 0;
    let duration = 0;
    let sizeBytes = Variables.file.Orig.Size;
    Logger.ILog("FileSize in Bytes = " + sizeBytes);
    let durationSeconds = Variables.video.Duration
    Logger.ILog("Duration in Seconds = " + durationSeconds);

    switch (Unit)
    {
        case "Gb Per Hour":
            size = parseFloat((sizeBytes/1024/1024/1024));
            Logger.ILog("FileSize in Gb = " + size);
            duration = parseFloat((durationSeconds/60/60));
            Logger.ILog("Duration in Hours = " + duration);
            break;
        case "Mb Per Minute":
            size = parseFloat((sizeBytes/1024/1024));
            Logger.ILog("FileSize in Mb = " + size);
            duration = parseFloat((durationSeconds/60));
            Logger.ILog("Duration in Minutes = " + duration);
            break;
    }
    
    result = size/duration;

    if(result < Threshold){
        Logger.ILog("Result of " + result + " is less than " + Threshold)
        return 1; // Below Threshold
    }
    else if (result > Threshold){
        Logger.ILog("Result of " + result + " is greater than " + Threshold)
        return 2; // Above Threshold
    }
    else{
        Logger.ILog("Something went wrong comparing " + duration + " with " + size)
        return 0; // Error
    }
}

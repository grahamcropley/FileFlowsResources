/**
 * @description Detects if the input video is HEVC Main 10 with p010le pixel format
 * @output Matched HEVC Main 10 with p010le pixel format
 * @output Some other combination of codec, bit depth, and pixel format used
 */
function Script()
{
    let cmd = new ExecuteArgs();

    cmd.Command = Flow.GetToolPath('ffprobe');
    cmd.ArgumentList = ['-v', 'error',
            '-select_streams', 'v:0',
            '-show_entries', 'stream=codec_name,profile,pix_fmt,r_frame_rate,avg_frame_rate',
            '-of', 'json',
            Variables.file.Orig.FullName
        ];
    
    let result = Flow.Execute(cmd);

    /*
    Logger.ILog(result.output);
    Logger.ILog(JSON.parse(result.output));
    Logger.ILog(JSON.parse(result.output).streams);
    Logger.ILog(JSON.parse(result.output).streams[0].codec_name);
    Logger.ILog(JSON.parse(result.output).streams[0].profile);
    Logger.ILog(JSON.parse(result.output).streams[0].pix_fmt);
    */

    let video = JSON.parse(result.standardOutput).streams[0];
    if(video === null)
    {
        return 0; // Fail - no video stream
    }else{        
        if(video.codec_name == "hevc" && video.profile == "Main 10" && (video.pix_fmt == 'p010le' || video.pix_fmt == 'yuv420p10le'))
        {
            Logger.ILog("MATCHED! HEVC Main 10 p10le");
            return 1;
        }else{
            Logger.ILog("NO MATCH! HEVC Main 10 p10le");
            Logger.ILog(video.codec_name + " " + video.profile + " " + video.pix_fmt)
            return 2;
        }
    }
}

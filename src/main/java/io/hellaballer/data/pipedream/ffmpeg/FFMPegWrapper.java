package io.hellaballer.data.pipedream.ffmpeg;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.util.List;
import java.util.StringJoiner;
import java.util.stream.Collectors;

import io.hellaballer.data.pipedream.speech.Time;

public class FFMPegWrapper {
	static DecimalFormat formatter = new DecimalFormat("00.000");

	public static File convertVideosToAudio(File video) {
		Process p;
		try {
			String musicOut = video.getAbsolutePath().substring(0, video.getAbsolutePath().lastIndexOf(".")) + ".wav";
			p = Runtime.getRuntime()
					.exec("ffmpeg -i " + video.getAbsolutePath() + " -acodec pcm_s16le -ac 2 " + musicOut);
			p.waitFor();
			return new File(musicOut);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static void cutVideo(Time time, String outputPath) {

		// ffmpeg -i -ss 00:00:09.240 -to 00:00:12.360 -vcodec libx264 -acodec
		// libvo_aacenc output2.mp4

		Process p;
		try {
			p = Runtime.getRuntime().exec("ffmpeg -i " + time.getVideo().getAbsolutePath() + " -ss "
					+ convertSecsToTimeString(time.getStart()) + " -to " + convertSecsToTimeString(time.getEnd())
					+ " -vcodec libx264 -acodec libvo_aacenc " + outputPath);
			p.waitFor();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public static void segmentVideo(File video, int numSegments) {
		// ffmpeg -i f -c copy -map 0 -segment_time 8 -f segment output%03d.mp4
		Process p;
		try {
			String command = "ffmpeg -i " + video.getAbsolutePath() + " -c copy -map 0 -segment_time " + numSegments
					+ " -f segment " + video.getParent() + "/split/output%03d.mp4";
			System.out.println(command);
			p = Runtime.getRuntime().exec(command);
			p.waitFor();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public static File concatVideos(List<File> videos, String outputString) {
		// ffmpeg -i "concat:output.mp4|output2.mp4" -c copy concat.mp4

		List<String> lines = videos.stream().map(l -> "file '" + l + "'").collect(Collectors.toList());
		String pathStr = "/tmp/" + videos.hashCode() + ".txt";
		Path file = Paths.get(pathStr);
		try {
			Files.write(file, lines, Charset.forName("UTF-8"));

		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		System.out.println("Wrote to " + file.toString());
		
		Process p;
		try {
			// ffmpeg -f concat -i mylist.txt -c copy ghettov2.mp4

			String cmd = "ffmpeg -f concat -safe 0 -i " + pathStr + " -c copy " + outputString;
			p = Runtime.getRuntime().exec(cmd);
			System.out.println("COMMAND: " + cmd);
			p.waitFor();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return new File(outputString);
	}

	public static String convertSecsToTimeString(double timeInput) {
		// Convert number of seconds into hours:mins:seconds string
		int timeSeconds = (int) timeInput;
		int hours = timeSeconds / 3600;
		int mins = (timeSeconds % 3600) / 60;
		double secs = timeSeconds % 60 + timeInput % 1;
		String timeString = String.format("%02d:%02d:%s", hours, mins, formatter.format(secs));
		return timeString;
	}
}

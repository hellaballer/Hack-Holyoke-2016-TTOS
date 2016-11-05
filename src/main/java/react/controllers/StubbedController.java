package react.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import io.hellaballer.data.pipedream.core.Mapper;
import io.hellaballer.data.pipedream.core.Reducer;
import io.hellaballer.data.pipedream.core.Sharder;
import io.hellaballer.data.pipedream.ffmpeg.FFMPegWrapper;
import io.hellaballer.data.pipedream.speech.Time;

/**
 * GET request that accepts a string of words and returns the path to the video
 */
@Controller
@RequestMapping("/api")
public class StubbedController {

	final Map<String, List<Time>> map;

	public StubbedController() {
		map = retrieveTimes("/home/ubuntu/Documents/output.txt");
//		map.putAll(retrieveTimes(pathName));
		System.out.println("TIMES RETRIEVED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println("MAP SIZE: " + map.size());
		System.out.println(map.get("parent"));
		System.out.println(map.keySet());

		System.out.println("HACK");
	}

	public static Map<String, List<Time>> retrieveTimes(String pathName) {
		try {
			List<String> lines = Files.readAllLines(Paths.get(pathName));
			Map<String, List<Time>> timeMap = new HashMap<String, List<Time>>();
			String word = null;
			List<Time> times = null;

			for (String str : lines) {
				if (str.endsWith(":")) {
					if (word != null) {
						timeMap.put(word, times);
					}
					word = str.substring(0, str.length() - 1).toLowerCase();
					times = new ArrayList<Time>();
				} else {
					double start = Double.parseDouble(str.substring(str.indexOf('(') + 1, str.indexOf(',')));
					double end = Double.parseDouble(str.substring(str.indexOf(',') + 2, str.indexOf(')')));
					String path = str.substring(str.indexOf(')') + 2);
					times.add(new Time(new File(path), start, end));
				}
			}
			timeMap.put(word, times);
			return timeMap;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

	@RequestMapping(method = RequestMethod.GET, value = "stub")
	HttpEntity<String> stub(@RequestParam("paramValue") String paramValue) {
		if (paramValue.equals("")) {
			System.out.println("EMPTY");
			return new ResponseEntity<>("", HttpStatus.OK);
		}
		System.out.println("Param Value: " + paramValue);

		// Shard
		Sharder<String, Time> sharder = new Sharder<>(paramValue);
		try {

			sharder.runShard(s -> {
				List<Time> times = new ArrayList<>();
				List<String> words = Arrays.asList(s.split(" ")).stream().map(a -> a.trim().toLowerCase())
						.collect(Collectors.toList());
				for (String word : words) {
					word = word.trim();
					System.out.println(map.keySet());
					System.out.println("\"" + word + "\"");
					if (!map.containsKey(word)) {
						System.out.println("UNKNOWN WORDS: " + word);
						throw new IllegalStateException(word);
					}
					times.add(map.get(word).get(0));
				}
				return times;
			});
		} catch (IllegalStateException ex) {
			sharder.destroy();
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_IMPLEMENTED);
		}

		List<Time> times = sharder.getOutputs();
		System.out.println("Times: " + times);
		sharder.destroy();
		Mapper<Time, File> mapToVideo = new Mapper<>(times.size());

		mapToVideo.setInputs(times);
		final Path path = Paths.get("/tmp/ttos/outputs/");
		path.toFile().mkdirs();
		mapToVideo.runMap(t -> {
			System.out.println(t);
			String folderStr = String.valueOf(String.valueOf(t.getStart()).hashCode() + String.valueOf(t.getEnd()).hashCode());
			if (path.resolve(folderStr).toFile().exists() && path.resolve(folderStr).toFile().listFiles().length > 0) {
				System.out.println("Reading from cache");
				return path.resolve(folderStr).toFile().listFiles()[0];
			} else {
				System.out.println("creating");
				File chop = new File(path.resolve(folderStr).toFile().getAbsolutePath() + "/"
						+ String.valueOf(t.getVideo().hashCode() + (int) t.getStart() + (int) t.getEnd() * 4) + ".mp4");
				System.out.println(chop.getAbsolutePath());
				chop.getParentFile().mkdirs();
				
				System.out.println("Source video: " + t.getVideo().getPath());
				System.out.println(t.getVideo().exists());
				FFMPegWrapper.cutVideo(t, chop.getAbsolutePath());
				System.out.println("Video cut " + chop.getAbsolutePath());
				return chop;
			}

		});

		List<File> files = mapToVideo.getOutputs();
		mapToVideo.destroy();

		Reducer<File> reducer = new Reducer<>(files.size());
		reducer.setInputs(files);

		reducer.runReduce((file1, file2) -> {

			File f = new File(path.toFile().getAbsolutePath() + "/"
					+ String.valueOf(file1.hashCode() + file2.hashCode() + System.currentTimeMillis()) + ".mp4");
			System.out.println("merged File: " + f);
			return FFMPegWrapper.concatVideos(Arrays.asList(file1, file2), f.getAbsolutePath());
		});

		File finalFile = reducer.getOutput();

		System.out.println("FINAL: " + finalFile.getAbsolutePath());

		String videoURL = finalFile.getAbsolutePath();
		System.out.println("OK STATUS");
		return new ResponseEntity<>(videoURL, HttpStatus.OK);

	}
}

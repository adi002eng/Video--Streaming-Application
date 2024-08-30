package com.stream.app.service;

import com.stream.app.entities.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {



    Video save(Video video, MultipartFile file);


    Video get(String videoId);

    Video getByTitle(String title);

    public static List<Video> getAll() {
        return null;
    }


    String processVideo(String videoId,MultipartFile file);


}

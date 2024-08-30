package com.stream.app.impl;

import com.stream.app.entities.Video;
import com.stream.app.repositories.VideoRepository;
import com.stream.app.service.VideoService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import static java.nio.file.Files.copy;

@Service
public class VideoServiceimpl implements VideoService {
    @Value("${files.video}")
    String DIR;

    @Value("${file.video.hsl}")
    String HSL_DIR;


    private VideoRepository videoRepository;


    public VideoServiceimpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @PostConstruct
    public void init() {

        File file = new File(DIR);

        try {
            Files.createDirectories(Paths.get(HSL_DIR));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        if (file.exists()) {
            file.mkdir();
            System.out.println("folder Created:");
        } else {
            System.out.println("Folder Already Created:");
        }

    }


    @Override
    public Video save(Video video, MultipartFile file) {
        try {


            String filename = file.getOriginalFilename();
            String contentType = file.getContentType();
            InputStream inputStream = file.getInputStream();


            String cleanFileName = StringUtils.cleanPath(filename);
            String cleanFolder = StringUtils.cleanPath(DIR);


            Path path = Paths.get(cleanFolder, cleanFileName);

            System.out.println(contentType);
            System.out.println(path);


            copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);

            video.setContentType(contentType);
            video.setFilePath(path.toString());


            videoRepository.save(video);


        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }


        return null;
    }



    @Override
    public Video get(String videoId) {

      Video video = videoRepository
              .findById(videoId)
              .orElseThrow(()-> new RuntimeException("video not found"));

        return video;
    }

    @Override
    public Video getByTitle(String title) {
        return null;
    }

//    @Override
    public List<Video> getAll() {

        return videoRepository.findAll();
    }

    @Override
    public String processVideo(String videoId,MultipartFile file)

    {

       Video video = this.get(videoId);
        String filePath = video.getFilePath();


        Path videoPath = Paths.get(filePath);



        return null;
    }

}



package com.xperp.clothing.application;

import lombok.extern.slf4j.Slf4j;
import org.junit.Rule;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext;
import org.springframework.stereotype.Service;
import org.testcontainers.Testcontainers;
import org.testcontainers.containers.BrowserWebDriverContainer;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
@Slf4j
public class WebDriverHandler {
    public WebDriver webDriver;
    private int port = 8080;
    @Autowired(required = false)
    private ServletWebServerApplicationContext webServerAppCtxt;
    @Rule
    public BrowserWebDriverContainer<?> chrome = new BrowserWebDriverContainer<>()
            .withCapabilities(new ChromeOptions())
            .withRecordingMode(BrowserWebDriverContainer.VncRecordingMode.SKIP, new File(""));
    @Value("${webdriver:docker}")
    public String webDriverType;

    public WebDriver getWebDriver() {
        if (webDriver == null) {
            if (webDriverType.equals("docker")) {
                Testcontainers.exposeHostPorts(port);
                chrome.start();
                this.webDriver = chrome.getWebDriver();
            } else {
                webDriver = createWebDriver();
            }
        }
        return webDriver;
    }


    @PostConstruct
    private void init() {
        if (webServerAppCtxt != null) {
            this.port = webServerAppCtxt.getWebServer().getPort();
        }
    }


    public WebDriver createWebDriver() {
        try {
            String chromeDriverBinaryPath = getChromeDriverBinaryPath();
            System.setProperty("webdriver.chrome.driver", chromeDriverBinaryPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ChromeDriver();
    }

    private String getChromeDriverBinaryPath() throws IOException {
        try (Stream<Path> walkStream = Files.walk(Paths.get(System.getProperty("user.home"), ".gradle", "webdriver", "chromedriver"))) {
            return walkStream
                    .filter(this::isChromeDriverBinary)
                    .findFirst()
                    .orElseThrow(() -> new IllegalStateException("can't find chrome driver binary"))
                    .toAbsolutePath().toString();
        }
    }

    private boolean isChromeDriverBinary(Path p) {
        File file = p.toFile();
        return file.isFile() && (file.getPath().endsWith("chromedriver") || file.getPath().endsWith("chromedriver.exe"));
    }

    public void open(String url) {
        getWebDriver().get(getBaseUrl() + url);
    }

    public String getBaseUrl() {
        return "http://" + getDomain();
    }


    private String getDomain() {
        if (isDocker()) {
            return getDockerAddress() + ":" + port;
        }
        return "localhost:" + port;
    }

    private boolean isDocker() {
        return this.webDriverType.equals("docker");
    }

    private String getDockerAddress() {
        String OS = System.getProperty("os.name").toLowerCase();
        if (OS.contains("mac")) {
            return "host.docker.internal";
        }
        return "host.testcontainers.internal";
    }

    public void removeAllCookies() {
        getWebDriver().manage().deleteAllCookies();
    }

    public Cookie getCookie(String cookieName) {
        return getWebDriver().manage().getCookieNamed(cookieName);
    }

    public void addCookie(String cookieName, String cookieValue) {
        Cookie cookie = new Cookie(cookieName, cookieValue, "/");
        getWebDriver().manage().addCookie(cookie);
    }

}

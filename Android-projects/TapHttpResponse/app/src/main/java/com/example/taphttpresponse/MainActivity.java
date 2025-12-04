package com.example.taphttpresponse;

import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private ProgressBar progressBar;
    private final String Asset_FullPathIndexFile = "https://android_asset/index.html";
    private static final String TAG = "CustomStatusInjector";



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccess(false);


        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        //webView.setWebViewClient(new WebViewClient());
        webView.setWebViewClient(new CustomWebViewClient(this, Asset_FullPathIndexFile));

        progressBar = findViewById(R.id.progressBar);
        progressBar.bringToFront();

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if (newProgress < 100) {
                    progressBar.setVisibility(View.VISIBLE);
                } else {
                    progressBar.setVisibility(View.GONE);
                }
            }
        });

        webView.loadUrl(Asset_FullPathIndexFile);
    }


    private static class CustomWebViewClient extends WebViewClient {
        private final Context context;
        private final String Asset_FullPathIndexFile;

        public CustomWebViewClient(Context context, String Asset_FullPathIndexFile) {
            this.context = context;
            this.Asset_FullPathIndexFile = Asset_FullPathIndexFile;
        }

        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {

            String requestedUrl = request.getUrl().toString();
            System.out.println("reached");
            System.out.println(requestedUrl);
            WebResourceResponse response = null;


            try {
                Map<String, String> headers = new HashMap<>();
                String customStatusMessage = "TapResponse-200-SUCCESS";
                headers.put("X-App-Custom-Status", customStatusMessage);

                if (requestedUrl.equals(Asset_FullPathIndexFile)){
                    InputStream dataStream = context.getAssets().open("index.html");
                    response = new WebResourceResponse(
                            "text/html",
                            "UTF-8",
                            200,
                            customStatusMessage,
                            headers,
                            dataStream
                    );
                }

                if (requestedUrl.equals("https://sagnikpalchowdhury.github.io/new-joinee-workspace-shayantani/")){

                    URL newUrl = new URL(requestedUrl);
                    HttpURLConnection connection = (HttpURLConnection) newUrl.openConnection();

                    connection.setRequestMethod("GET");
                    connection.setDoInput(true);
                    connection.connect();

                    InputStream datastream = connection.getInputStream();;
                    response = new WebResourceResponse(
                            "text/html",
                            "UTF-8",
                            200,
                            customStatusMessage,
                            headers,
                            datastream
                    );
                }


                return response;

            } catch (IOException e) {
                Log.e(TAG, "Failed to load index file ", e);
                return null;
            }

        }
    }
}
vcl 4.1;

backend default {
    .host = "127.0.0.1";
    .port = "3001";
}

acl purge {
    "localhost";
    "127.0.0.1";
}

sub vcl_recv {
    set req.http.respTime = now;


    if (req.method == "PURGE") {
    if (!client.ip ~ purge) {
    return(synth(405, "Not Allowed"));
    }
    return (purge);
    }
}

sub vcl_backend_response {
  set beresp.ttl = 60s;
}
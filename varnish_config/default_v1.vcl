vcl 4.1;

backend default {
    .host = "127.0.0.1";
    .port = "3001";
}

sub vcl_backend_response {
    set beresp.ttl = 20s;
}
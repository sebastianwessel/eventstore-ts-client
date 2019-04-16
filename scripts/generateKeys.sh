#! /bin/bash
openssl req -x509 -sha256 -new -nodes -subj "/CN=root" -key rootCA.key -days 365 -out rootCA.crt
openssl genrsa -out domain.key 2048
openssl req -new -sha256 -nodes -key domain.key -subj "/CN=escluster.net" -out domain.csr
openssl x509 -req -in domain.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -extfile <(printf "subjectAltName=DNS:escluster.net,DNS:cluster1.escluster.net,DNS:cluster2.escluster.net,DNS:cluster3.escluster.net,IP:172.22.0.2,IP:172.22.0.3,IP:172.22.0.4")  -out domain.crt -days 365 -sha256
openssl req -x509 -sha256 -nodes -days 365 -subj "/CN=escluster.net" -newkey rsa:2048 -keyout invalid.key -out invalid.crt
openssl pkcs12 -passout "pass:" -export -inkey domain.key -in domain.crt -out domain.p12
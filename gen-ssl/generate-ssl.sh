#!/bin/sh

# Sources
# https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate/43666288#43666288
# https://github.com/weprovide/valet-plus/blob/master/cli/Valet/Site.php

if [ -z "$1" ]
then
  echo "Please supply a subdomain to create a certificate for";
  echo "e.g. www.mysite.com"
  exit;
fi

_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/
_APP_ROOT="$(dirname "$_DIR")"
_TMP_DIR=${_DIR}tmp/
_DEST_DIR=${_APP_ROOT}/cnf/ssl/

DOMAIN=$1
COMMON_NAME=${2:-$DOMAIN}
SUBJECT="/C=/ST=/O=/localityName=/commonName=${DOMAIN}/organizationalUnitName=/emailAddress=/"
NUM_OF_DAYS=999

mkdir -p ${_TMP_DIR}

cat ${_DIR}v3.ext | sed s/%%DOMAIN%%/$COMMON_NAME/g > ${_TMP_DIR}__v3.ext

echo "Generating device.key..."
openssl genrsa -out ${_TMP_DIR}device.key 2048

echo "Generating device.csr..."
openssl req -new -key ${_TMP_DIR}device.key -out ${_TMP_DIR}device.csr -subj "$SUBJECT" -config ${_TMP_DIR}__v3.ext -passin pass:

echo "Generating device crt..."
openssl x509 -req -days $NUM_OF_DAYS -in ${_TMP_DIR}device.csr -signkey ${_TMP_DIR}device.key -out ${_TMP_DIR}device.crt -extensions v3_req -extfile ${_TMP_DIR}__v3.ext

# move output files to final filenames
mv ${_TMP_DIR}device.key ${_DEST_DIR}server.key
mv ${_TMP_DIR}device.csr ${_DEST_DIR}server.csr
mv ${_TMP_DIR}device.crt ${_DEST_DIR}server.crt

# remove temp file
rm -rf ${_TMP_DIR}

# install on keychain (macOS)
echo "Installing certificates on Keychain. May ask for user password, please type it"
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ${_DEST_DIR}server.crt

echo "Self signed SSL certifications generated"


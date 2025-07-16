#!/bin/bash

# 도메인 설정
domains=(globalnomad.site www.globalnomad.site)
rsa_key_size=4096
data_path="./certbot"
email="cksgh5477@gmail.com"
# staging=0 # 실제 인증서 발급 (모든 테스트 완료 후 마지막에만 사용)
staging=1 # 테스트용 인증서 발급 (Rate Limit 회피를 위해 사용)

# 기존 데이터가 있는지 확인
if [ -d "$data_path" ]; then
  read -p "기존 인증서 데이터가 있습니다. 삭제하고 계속하시겠습니까? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

# 필요한 디렉토리 생성
if [ ! -d "$data_path/conf" ]; then
  mkdir -p "$data_path/conf"
fi

if [ ! -d "$data_path/www" ]; then
  mkdir -p "$data_path/www"
fi

# TLS 파라미터 다운로드
if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### SSL 파라미터 다운로드 중..."
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

# 임시 인증서 생성 (nginx 시작을 위해)
echo "### 임시 자체 서명 인증서 생성 중..."
path="/etc/letsencrypt/live/globalnomad.site"
mkdir -p "$data_path/conf/live/globalnomad.site"
docker run --rm -v "$PWD/$data_path/conf:/etc/letsencrypt" \
  --entrypoint "/bin/sh" certbot/certbot \
  -c "openssl req -x509 -nodes -newkey rsa:1024 -days 1 \
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'"
echo

# nginx 시작
echo "### nginx 시작 중..."
docker-compose up -d nginx
echo

# 임시 인증서 삭제
echo "### 임시 인증서 삭제 중..."
docker run --rm -v "$PWD/$data_path/conf:/etc/letsencrypt" \
  --entrypoint "/bin/sh" certbot/certbot \
  -c "rm -rf /etc/letsencrypt/live/globalnomad.site && \
      rm -rf /etc/letsencrypt/archive/globalnomad.site && \
      rm -rf /etc/letsencrypt/renewal/globalnomad.site.conf"
echo

# Let's Encrypt 인증서 요청
echo "### Let's Encrypt 인증서 요청 중..."
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# 스테이징 환경 선택
case "$staging" in
  1) staging_arg="--staging" ;;
  *) staging_arg="" ;;
esac

docker run --rm \
  -v "$PWD/$data_path/conf:/etc/letsencrypt" \
  -v "$PWD/$data_path/www:/var/www/certbot" \
  certbot/certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    --email $email \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    $domain_args
echo

# nginx 재시작
echo "### nginx 재시작 중..."
docker-compose restart nginx
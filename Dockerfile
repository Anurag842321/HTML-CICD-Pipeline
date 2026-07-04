FROM rockylinux:9.3.20231119

LABEL maintainer="ANURAG MISHRA | anuragmishra@gmail.com"

RUN yum install nginx -y

COPY ./* /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html/

EXPOSE 80 443

CMD ["nginx","-g","daemon off;"]

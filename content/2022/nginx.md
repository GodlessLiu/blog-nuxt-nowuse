---
title: nginx 基础知识学习
date: 2022-06-24
tag: NGINX
icon: cib:nginx
description: nginx 学习
---


## 什么是nginx
Nginx是一款轻量级的Web服务器、反向代理服务器，由于内存占用少，启动极快，高并发能力强，被广泛应用在互联网项目中。

## centos7 安装nginx
1. yum安装
```bash
sudo yum install yum-utils net-tools
```

```bash
cat > /etc/yum.repos.d/nginx.repo << EOF
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/\$releasever/\$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
EOF
```
```bash
sudo yum install nginx
```

2. nginx 常用命令
```bash
#启动nginx
nginx 

#立即停止
nginx -s stop

#执行完当前请求再停止
nginx -s quit

#重新加载配置文件，相当于restart
nginx -s reload

#将日志写入一个新的文件
nginx -s reopen

#测试配置文件
nginx -t
```
nginx日志位于/var/log/nginx/

nginx的配置文件位于`/etc/nginx/nginx.conf `,由于nginx.conf文件下包含命令`include /etc/nginx/conf.d/*.conf`,nginx会自动读取conf.d文件夹下的所有后缀名为`.conf`的文件，合并为nginx的配置文件，这样可以使得主配置文件更加简洁，多个`.conf`文件方便区分。

## nginx配置文件的结构
```nginx
http {

  server{#虚拟主机
     
    location {
      listen 80；
      server_name localhost;
    }
    location {
       
    }
      
  }

  server{
  
  }
}
```

## 静态网页
配置文件示例：
```nginx
server{
  
    listen 8000;
    server_name localhost;
    
    location / {
        root /home/AdminLTE-3.2.0;
        index index.html index2.html index3.html;
    }
}
```
虚拟主机server通过listen和server_name进行区分，如果有多个server配置，listen + server_name 不能重复。

### 参数解释
- listen
  监听可以配置为ip或端口或ip+端口
  ```nginx
  // 这些都是合法的
  listen 127.0.0.1:8000; 
  listen 127.0.0.1;（ 端口不写,默认80 ） 
  listen 8000; 
  listen *:8000; 
  listen localhost:8000;
  ```

- server_name
  server_name主要用来区分，可以随便起。
  也可以使用变量`$hostname`配置主机名
  或者配置成域名：`example.org` `www.example.org` `*.example.org`
  如果多个server的端口重复，那么根据域名或者主机名去匹配 server_name 进
  择。

- localhost
  /请求指向 root 目录
  location 总是从/目录开始匹配，如果有子目录，例如/css，他会指向/static/css
  ```nginx
  location /css {
    root /static;
  }
  ```

## nginx反向代理
### 正向代理和反向代理的区别
- 正向代理
  在*客户端*代理转发请求称为*正向代理*。如：vpn

- 反向代理
  在*服务端*代理转发请求称为*反向代理*。如：nginx

### nginx配置文件
```nginx
server {

  listen 8001;
  
  server_name ruoyi.localhost;
  
  location / {
    proxy_pass http://localhost:8088;
  }

}
```
这里我们会把请求`8001`端口的请求转到`8088`端口去。  
```nginx
location /some/path/ {
    proxy_pass http://localhost:8080;
}
```
- 如果`proxy-pass`的地址只配置到端口，不包含/或其他路径，那么location将被追加到转发地址中,如上所示，访问 http://localhost/some/path/page.html 将被代理到 http://localhost:8080/some/path/page.html 

```nginx
location /some/path/ {
    proxy_pass http://localhost:8080/zh-cn/;
}
```
- 如果`proxy-pass`的地址包括/或其他路径，那么/some/path将会被替换，如上所示，访问 http://localhost/some/path/page.html 将被代理到 http://localhost:8080/zh-cn/page.html

由于使用反向代理之后，后端服务无法获取用户的真实IP，所以，一般反向代理都会设置以下header信息。
```nginx
location /some/path/ {
    #nginx的主机地址
    proxy_set_header Host $http_host;
    #用户端真实的IP，即客户端IP
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_pass http://localhost:8088;
}
```
常用变量的值：
  `$host`：nginx主机IP，例如192.168.56.105
  `$http_host`：nginx主机IP和端口，192.168.56.105:8001
  `$proxy_host`：localhost:8088，proxy_pass里配置的主机名和端口
  `$remote_addr`:用户的真实IP，即客户端IP。

## 动静分离和location修饰符
当我们处理一些静态文件的时候，如果后端服务使用的tocmat是，它处理css、js、图片这些静态文件的IO性能不够好。所以我们希望我们能够通过nginx来处理这些静态文件。为后端服务器有效的降压。  
如以下配置  
当我们访问html/ie.html时，会被nginx转到/home/www/static下。
```nginx
server{
  location / {
    proxy_pass http://localhost:8080/;
  }
  
  location = /html/ie.html {
    root  /home/www/static;
  }
  
  location ^~ /fonts/ {
   
    root  /home/www/static;
  }
  
  location ~ \.(css|js|png|jpg|gif|ico) {
    root /home/www/static;
}
```
location的一些修饰符：  
location可以使用修饰符或正则表达式  
- 修饰符： 
=  等于，严格匹配 ，匹配优先级最高。
^~ 表示普通字符匹配。使用前缀匹配。如果匹配成功，则不再匹配其它 location。优先级第二高。
~  区分大小写
~* 不区分大小写
- 优先级  
优先级从高到低依次为：  
1. 精确匹配（=）
2. 前缀匹配（^~）
3. 正则匹配（~和～*）
4. 不写

## 缓冲和缓存
### 缓冲
缓冲一般放在内存中，如果不适合放入内存（比如超过了指定大小），则会将响应写入磁盘临时文件中。  
启用缓冲后，nginx先将后端的请求响应（response）放入缓冲区中，等到整个响应完成后，再发给客户端
![nginx buffer](/img/nginx/nginx-buffer.png)
客户端往往是用户网络，情况复杂，可能出现网络不稳定，速度较慢的情况。
而nginx到后端server一般处于同一个机房或者区域，网速稳定且速度极快。
![nginx buffer](/img/nginx/nginx-buffer-1.png)
如果禁用了缓冲，则在客户端从代理服务器接收响应时，响应将同步发送到客户端。对于需要尽快开始接收响应的快速交互式客户端，此行为可能是可取的。
这就会带来一个问题：因为客户端到nginx的网速过慢，导致nginx只能以一个较慢的速度将响应传给客户端；进而导致后端server也只能以同样较慢的速度传递响应给nginx，造成一次请求连接耗时过长。
在高并发的情况下，后端server可能会出现大量的连接积压，最终拖垮server端。
![nginx buffer](/img/nginx/nginx-buffer-2.png)
开启代理缓冲后，nginx可以用较快的速度尽可能将响应体读取并缓冲到本地内存或磁盘中，然后同时根据客户端的网络质量以合适的网速将响应传递给客户端。
这样既解决了server端连接过多的问题，也保证了能持续稳定的像客户端传递响应。
使用proxy_buffering启用和禁用缓冲，nginx默认为 on 启用缓冲，若要关闭，设置为 off。
```nginx
proxy_buffering off;
``` 
proxy_buffers 指令设置每个连接读取响应的缓冲区的大小和数量 。默认情况下，缓冲区大小等于一个内存页，4K 或 8K，具体取决于操作系统。  
来自后端服务器响应的第一部分存储在单独的缓冲区中，其大小通过 proxy_buffer_size 指令进行设置，此部分通常是相对较小的响应headers，通常将其设置成小于默认值。
```nginx
location / {
    proxy_buffers 16 4k;
    proxy_buffer_size 2k;
    proxy_pass http://localhost:8088;
}
```
### 缓存
启用缓存后，nginx将响应保存在磁盘中，返回给客户端的数据首先从缓存中获取，这样子相同的请求不用每次都发送给后端服务器，减少到后端请求的数量。
![nginx buffer](/img/nginx/buffer.png)

启用缓存，需要在http上下文中使用`proxy_cache_path`指令，定义缓存的本地文件目录，名称和大小。
缓存区可以被多个server共享，使用`proxy_cache`指定使用哪个缓存区。
```nginx
http {
    proxy_cache_path /data/nginx/cache keys_zone=mycache:10m;
    server {
        proxy_cache mycache;
        location / {
            proxy_pass http://localhost:8000;
        }
    }
}
```
缓存不应该设置的太敏感，可以使用proxy_cache_min_uses设置相同的key的请求，访问次数超过指定数量才会被缓存。
```nginx
proxy_cache_min_uses 5;
```
默认情况下，响应无限期地保留在缓存中。仅当缓存超过最大配置大小时，按照时间删除最旧的数据。  
示例
```nginx
proxy_cache_path /var/cache/nginx/data keys_zone=mycache:10m;

server {

    listen 8001;
    server_name ruoyi.localhost;
    
    location / {
        #设置buffer
        proxy_buffers 16 4k;
        proxy_buffer_size 2k;
        proxy_pass http://localhost:8088;        

    }


    location ~ \.(js|css|png|jpg|gif|ico) {
        #设置cache
        proxy_cache mycache;
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404      1m;
        proxy_cache_valid any 5m;

        proxy_pass http://localhost:8088;  
    }

    location = /html/ie.html {

        proxy_cache mycache;
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404      1m;
        proxy_cache_valid any 5m;

        proxy_pass http://localhost:8088;  
    }

    location ^~ /fonts/ {

        proxy_cache mycache;
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404      1m;
        proxy_cache_valid any 5m;

        proxy_pass http://localhost:8088;  
    }

}
```

## 负载均衡
跨多个应用程序实例的负载平衡是一种常用技术，用于优化资源利用率、最大化吞吐量、减少延迟和确保容错配置。使用nginx作为非常有效的HTTP负载平衡器，将*流量分配到多个应用程序服务器*，可以提升Web应用程序的性能，提高扩展性和可靠性。
### 配置服务组
使用 upstream定义一组服务 。
```nginx
upstream ruoyi-apps {
    #不写，采用轮循机制
    server localhost:8080;
    server localhost:8088;
  
}

server {
  
  listen 8003;
  server_name ruoyi.loadbalance;
  
  location / {
    proxy_pass http://ruoyi-apps;
  }

}
```

### 负载均衡策略
1. 轮询策略  
  这是nginx默认的负载均衡策略，将请求以轮询的方式进行分发。
  
2. 最小连接  
  将请求分发给活动连接数最小的服务器。
  ```nginx
    upstream backend {
        least_conn;
        server backend1.example.com;
        server backend2.example.com;
    }
  ```
*请注意，使用轮循机制或最少连接的负载平衡，每个客户端的请求都可能分发到不同的服务器。不能保证同一客户端将始终定向到同一服务器。*  

3. ip-hash  
  客户端的 IP 地址将用作哈希键，来自同一个ip的请求会被转发到相同的服务器。
  ```nginx
  upstream backend {
      ip_hash;
      server backend1.example.com;
      server backend2.example.com;
  }
  ```
此方法可确保来自同一客户端的请求将始终定向到同一服务器，除非此服务器不可用。

4. hash   
  通用hash，允许用户自定义hash的key，key可以是字符串、变量或组合。
  例如，key可以是配对的源 IP 地址和端口，也可以是 URI，如以下示例所示：
  ```nginx
  upstream backend {
      hash $request_uri consistent;
      server backend1.example.com;
      server backend2.example.com;
  }
  ```
  consistent参数启用`ketama`一致哈希算法，如果在上游组中添加或删除服务器，只会重新映射*部分键*，从而最大限度地减少缓存失效。
  `consistent`举例
  假如我们的hash算法是对key取模4，下面是对应值
  ![hash 算法映射](/img/nginx/consistent-1.png)
  当我们4号服务器宕机时，如果*未使用consistent*，则是以下结果，这样不能保证之后同一ip的请求去了同一个服务器。
  ![未使用 consistent](/img/nginx/consistent-2.png)
  加入了`consistent`后，只会对宕机服务器对应的key做重新选中，未宕机的则会保持之前的对应关系。
  ![使用 consistent](/img/nginx/consistent-3.png)

5. 随机  
  每个请求都将传递到随机选择的服务器。
  two是可选参数，NGINX 在考虑服务器权重的情况下随机选择两台服务器，然后使用指定的方法选择其中一台，默认为选择连接数最少（least_conn）的服务器。
  ```nginx
  upstream backend {
      random two least_conn;
      server backend1.example.com;
      server backend2.example.com;
      server backend3.example.com;
      server backend4.example.com;
  }
  ```
  
6. 权重  
  ```nginx
  upstream my-server {
      server performance.server weight=3;
      server app1.server;
      server app2.server;
  }
  ```
如上所示，每 5 个新请求将按如下方式分布在应用程序实例中：3 个请求将定向到performance.server，一个请求将转到app1.server，另一个请求将转到app2.server。

7. 健康检查  
在反向代理中，如果后端服务器在某个周期内响应失败次数超过规定值，nginx会将此服务器标记为失败，并在之后的一个周期不再将请求发送给这台服务器。
通过`fail_timeout`来设置检查周期，默认为10秒。
通过`max_fails`来设置检查失败次数，默认为1次。
在以下示例中，如果NGINX无法向服务器发送请求或在30秒内请求失败次数超过3次，则会将服务器标记为不可用30秒。
  ```nginx
    upstream backend {
      server backend1.example.com;
      server backend2.example.com max_fails=3 fail_timeout=30s; 
    } 
  ```

## Https配置
HTTPS 协议是由HTTP 加上TLS/SSL 协议构建的可进行加密传输、身份认证的网络协议，主要通过数字证书、加密算法、非对称密钥等技术完成互联网数据传输加密，实现互联网传输安全保护。
### 生成证书
这里是我们自己生成的，浏览器会认为这个不是一个安全的连接
```nginx
openssl genrsa -des3 -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```
### 配置ssl
```nginx
server {
    listen              443 ssl;
    server_name         ruoyi.https;
    ssl_certificate     /home/ssl/server.crt;
    ssl_certificate_key /home/ssl/server.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
  
    location / {
        proxy_pass http://localhost:8088;
    }
}
```
如果我们的ssl证书设置了密码，需要加上`ssl_password_file`来告诉nginx我们的密码。
```nginx
server{
  ……
  ssl_password_file   /home/ssl/cert.pass;
  ……
} 
```
### 可以优化的点
SSL 操作会消耗额外的 CPU 资源。CPU 占用最多的操作是 SSL 握手。有两种方法可以最大程度地减少每个客户端的这些操作数：
- 使保持活动连接能够通过一个连接发送多个请求
- 重用 SSL 会话参数以避免并行连接和后续连接的 SSL 握手
会话存储在工作进程之间共享并由 ssl_session_cache 指令配置的 SSL 会话缓存中。一兆字节的缓存包含大约 4000 个会话。默认缓存超时为 5 分钟。可以使用 ssl_session_timeout 指令增加此超时。以下是针对具有 10 MB 共享会话缓存的多核系统优化的示例配置：
```nginx
ssl_session_cache   shared:SSL:10m;
ssl_session_timeout 10m;
```


## nginx 的十个场景
[nginx 的十个场景](https://mp.weixin.qq.com/s/gW8C_GJes4lOVhyczB_Cxw)

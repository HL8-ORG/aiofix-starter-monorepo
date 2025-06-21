---
title: 'Better-auth'
description: 'Better-auth 概述'
---

## Better-auth

Better-auth 是一个身份认证系统。它自行体系，基于一个自行开发的web服务框架 Better-call开始构建。

 Better-call 是一个微型的web服务框架，和nestjs一样，它并没有做服务器，只是做了Web标准兼容服务器（例如BUN，Node，NextJS，SextJs，Sveltekit ...）的适配

 在路由层它使用了[rou3](https://github.com/h3js/rou3),也是一个很轻的构建，非常实用。

 因此，你甚至可以认为 Better-auth 是一个相对独立的应用，与你的前端框架是两个不同的服务，类似与微服务架构。

 很核心的一层在packages/auth/nextjs-handlers.ts，这里进行了不同的框架的适配转换，是的 Better-auth 可以与你的前端框架共用一个web服务器。

 也正因为如此的架构设计，它的数据库服务调用其实也是独立的。因此，你需要进行数据服务提供者的适配。

 在 Better-call 之上才是 Better-auth，它包括三个部分组成：

- 其一就是，前面提到的请求处理转换器，它的作用是适配不同的框架
- 其二是，服务端的业务逻辑处理模块，它是一个称为 Better-auth 实例的配置器
- 其三是，前端使用的逻辑处理模块，称为 Better-auth 的 客户端，实际上就是一些接口函数，例如：signIn, signOut, signUp, useSession等等。

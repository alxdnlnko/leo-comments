FROM node:alpine
MAINTAINER Alex Danilenko <alxdnlnko@gmail.com>

RUN deluser --remove-home node

RUN apk --no-cache add \
    su-exec \
    dumb-init \
    git \
    curl
RUN yarn global add polymer-cli@next

ARG UID
ENV UID=${UID}
ARG GID
ENV GID=${GID}
ARG USER
ENV USER=${USER}
ARG GROUP
ENV GROUP=${GROUP}

RUN addgroup -g ${GID} ${GROUP} && \
  adduser -G ${GROUP} -u ${UID} -D ${USER} && \
  mkdir /app && chown -R ${USER}:${GROUP} /app

STOPSIGNAL SIGKILL
COPY entrypoint.sh /

WORKDIR /app

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/entrypoint.sh"]

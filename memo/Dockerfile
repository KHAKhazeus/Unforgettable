# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang

# Copy the local package files to the container's workspace.
COPY . $GOPATH/src/khakhazeus.cn/memo
WORKDIR $GOPATH/src/khakhazeus.cn/memo

RUN export GOPROXY=https://goproxy.cn
RUN export GOSUMDB=sum.golang.org
RUN go env -w GOPROXY=https://goproxy.cn
# Build the outyet command inside the container.
# (You may fetch or manage dependencies here,
# either manually or with a tool like "godep".)
RUN go get -u
RUN go build -o ./memo
ENTRYPOINT ./memo

# Document that the service listens on port 8080.
EXPOSE 8080